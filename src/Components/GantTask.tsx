import React from "react";
import {CyberObjectsStore} from "../Stores/CyberObjectsStore/CyberObjectsStore";
import {BatchStageModel} from "../Models/BatchStageModel";
import {BatchModel} from "../Models/BatchModel";
import {inject, observer} from "mobx-react";
import {ViewSettings} from "../Stores/ViewSettingsStore/ViewSettings";
import Rnd from 'react-rnd';
import {action} from "mobx";
import moment from 'moment';
export const subTaskColor = 'rgba(197, 197, 197, 0.58)';
export const taskColor = '#95aabd';
export const blockColor = 'rgba(118, 188, 239, 1)';

export interface GantModel {
    rndObject:any;
    dragged(hours:number): void;
    resized(direction:string, hours:number): void;
    widthInPx:number;
    offsetX:number;
}
export interface Selectable{
    selected:boolean;
    howered:boolean;
}

interface TreeRow {
    path: Array<string>|Array<number>;
    content: BatchStageModel|BatchModel;
    children: Array<TreeRow>;
    node:any;
}

interface GantTaskProps {
    row: TreeRow;
    store: CyberObjectsStore;
    style: any;
}
interface GTProps{
    cyberObjectsStore?:CyberObjectsStore;
    viewSettings?:ViewSettings;
    task:BatchModel|BatchStageModel;
    row:TreeRow;
    style:any;
}

interface GTState{
    dragging?: boolean;
    startX?: number;
    resizeDirection?:string;
    resizing?:boolean;
    resizedFor?:number;
}

@inject("viewSettings","cyberObjectsStore")
@observer
export class GantTask extends React.Component<GTProps,GTState> {
    constructor(){
        super();
        this.state = {
            dragging:false,
            startX:0,
            resizeDirection:'',
            resizing:false,
            resizedFor:0
        }
    }
    dragStarted() {
        console.log('drag started');
        let rnd = this.props.task.rndObject;
        if (!this.state.dragging)
            this.setState({dragging: true, startX: Math.ceil(rnd.state.x)});
    }

    resizeStarted(direction, data) {
        this.setState({resizeDirection: direction, resizing: true, resizedFor: 0});
    }

    @action
    resizeStopped(direction, data) {
        let hours = Math.floor(this.state.resizedFor);
        this.props.task.resized(this.state.resizeDirection, hours);
    }

    resizeEvent(event, direction, styleSize, clientSize, delta, newPos) {
        let viewMode = this.props.viewSettings;
        if (this.state.resizeDirection == 'right') {
            this.setState({
                resizedFor: clientSize.width / ((viewMode.cellWidth + 2)/24)
            });
        } else {
            this.setState({
                resizedFor: clientSize.width / ((viewMode.cellWidth + 2)/24)
            });
        }
    }

    @action
    dragStopped(e, d) {
        let startX = this.state.startX;
        let endX = this.props.task.rndObject.state.x;
        let moved = Math.ceil((endX - startX) / ((this.props.viewSettings.cellWidth + 2)/24));
        if (moved != 0) {
            this.props.task.dragged(moved);
        }
        this.setState({dragging: false});
    }

    render(){
        let {task,row,style,viewSettings} = this.props;
        let showChildren = false;
        switch (row.path.length - 1) {
            case 0:
                style = {
                    ...style,
                    background: blockColor,
                    height: '16px'
                };
                showChildren = true;
                break;
            case 1:
                style = {
                    ...style,
                    background: taskColor,
                    height: '16px'
                };
                showChildren = true;
                break;
            case 2:
                style = {
                    ...style,
                    background: subTaskColor,
                    height: '16px'
                };
                break;
        }

        let background = '#edf2f6';
        if(task instanceof BatchModel){
            if(task.howered)
                background = "#ffecbe"
            if(task.selected)
                background = "#ffc842";

        }
        if(task instanceof BatchStageModel){
            if(task.howered)
                background = "#b8fde3"
            if(task.selected)
                background = "#40ffad";

        }
        return(
            <div onMouseOver={(e)=>{
                viewSettings.setHoweredObject(task.uuid);
            }} onMouseLeave={(e)=>{
                viewSettings.setHoweredObject('');
            }} className="d-table__row" style={{}}>
                {viewSettings.headerItems.map((item, index) => {
                    if (item.isWeekend) {
                        return (
                            <div style={{
                                width:viewSettings.cellWidth,
                                background:background
                            }} key={`bg-header-${task.uuid}-${index}`}
                                 className="d-table__cell d-table__cell_weekend_true"></div>
                        )
                    }
                    return (
                        <div style={{
                            width:viewSettings.cellWidth,
                            background:background
                        }} key={`bg-header-${task.uuid}-${index}`} className="d-table__cell"></div>
                    )
                })}
                <Rnd style={style} ref={c => {
                    task.rndObject = c;
                }} initial={{
                    x: task.offsetX,
                    y: 0,
                    width: task.widthInPx,
                    height: style.height
                }}
                     onDragStart={() => {
                         this.dragStarted();
                     }}
                     onDragStop={(e, d) => {
                         this.dragStopped(e, d);
                     }}
                     onResizeStart={this.resizeStarted.bind(this)}
                     onResizeStop={this.resizeStopped.bind(this)}
                     onResize={this.resizeEvent.bind(this)}
                     moveAxis={'x'}
                     resizeGrid={[(viewSettings.cellWidth+2)/24]}
                     moveGrid={[(viewSettings.cellWidth+2)/24]}
                     isResizable={{
                         top: false,
                         right: true,
                         bottom: false,
                         left: true,
                         topRight: false,
                         bottomRight: false,
                         bottomLeft: false,
                         topLeft: false
                     }}
                >
                    <div itemType="task" onClick={(e) => {
                        viewSettings.setSelectedObject(task.uuid);
                    }} style={{
                        position: 'absolute', top: '0', left: '0', height: '100%', width: '100%',
                        border: task.selected ? '1px solid black' : '0'
                    }}>
                        {row.node.children.map((child)=>{
                            return(
                                <div key={`sub-${child.content.uuid}`} style={{width:child.content.widthInPx,height:task.selected?'14px':'16px',position:'absolute',left:(child.content.offsetX - task.offsetX),top:0,background:task instanceof BatchModel ? '#95aabd': 'yellow'}}>
                                </div>
                            )
                        })}
                        {this.props.children}
                    </div>
                </Rnd>
            </div>

        );
    }
}