import React from 'react';
import {ViewSettings} from "../Stores/ViewSettingsStore/ViewSettings";
import {CyberObjectsStore} from "../Stores/CyberObjectsStore/CyberObjectsStore";
import {inject, observer} from "mobx-react";
import {getFlatDataFromTree} from "../TaskTree/utils/tree-data-utils";
import GantHeader from "./GantHeader";
import {GantTask} from "./GantTask";


const containerStyle ={
    position:'relative',
    overflow:'hidden',
    overflowX:'auto'
};


interface GCProps{
    viewSettings?:ViewSettings,
    cyberObjectsStore?:CyberObjectsStore
}

@inject("viewSettings","cyberObjectsStore")
@observer
export class GantChart extends React.Component<GCProps,{}>{
    render(){
        let {viewSettings} = this.props;
        let tasksTree = this.props.cyberObjectsStore.gantTree;
        let rows = getFlatDataFromTree({
            treeData:tasksTree,getNodeKey:({node:_node,treeIndex})=>{
                return _node.content.uuid;
            },
            ignoreCollapsed:true
        });
        return(
            <div id="gant_wrapper" style={{...containerStyle,height:rows.length*31+160}}>
                <div className="d-table" style={{
                    height:'100%',
                    width:viewSettings.rowWidth
                }}>
                    <div className="d-table__body" style={{
                    paddingTop:1
                    }}>
                        <GantHeader />
                        {
                            rows.map((row) => {
                                return (
                                    <GantTask
                                        key={row.node.content.uuid}
                                        ref={(e) => {
                                            row.node.content.offsetY = (row.treeIndex+1) * 31;
                                        }}
                                        row={row}
                                        task={row.node.content}
                                        style={{
                                            top: '0px',
                                            background: '#aaa',
                                            margin: '7px 0'
                                        }}
                                    >
                                    </GantTask>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}