import React from 'react';
import {inject, observer} from "mobx-react";
import {CyberObjectsStore} from "../../Stores/CyberObjectsStore/CyberObjectsStore";
import {TaskTableViewMode} from "../../Stores/TaskTable/TaskTableViewMode";
import {ReactElement} from "react";
import {BatchModel} from "../../Models/BatchModel";
import {BatchRenderer} from "./BatchRenderer";
import {HeaderRenderer} from "./HeaderRenderer";
import {BatchStageModel} from "../../Models/BatchStageModel";
import {StageRenderer} from "./StageRenderer";
interface GantTableProps{
    cyberObjectsStore?:CyberObjectsStore;
    taskTableViewMode?:TaskTableViewMode;
}
@inject("cyberObjectsStore","taskTableViewMode")
@observer
export class GantTable extends React.Component<GantTableProps,{}>{
    render(){
        let {batchViewProperties,stageViewProperties} = this.props.taskTableViewMode;
        return(
            <table style={{borderSpacing: '0', borderCollapse: 'collapse'}}>
                <thead>
                    <HeaderRenderer />
                </thead>
                <tbody>
                {this.props.cyberObjectsStore.gantTree.map((gantObject,index)=>{
                    if(gantObject.content instanceof BatchModel) {
                        let rendered:Array<ReactElement<any>> = [];
                        rendered.push(<BatchRenderer key={gantObject.content.uuid} batch={gantObject.content}/>);
                        if(gantObject.expanded)
                            for(let stage of gantObject.children){
                                rendered.push(<StageRenderer key={stage.content.uuid} stage={stage.content}/>)
                            }
                        return rendered;
                    }
                    return(
                        <tr key={index}>
                            <td>
                               Empty
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
}