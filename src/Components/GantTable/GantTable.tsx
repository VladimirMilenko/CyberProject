import React from 'react';
import {inject, observer} from "mobx-react";
import {CyberObjectsStore} from "../../Stores/CyberObjectsStore/CyberObjectsStore";
import {TaskTableViewMode} from "../../Stores/TaskTable/TaskTableViewMode";
import {ReactElement} from "react";
import {BatchModel} from "../../Models/BatchModel";
import {BatchRenderer} from "./BatchRenderer";
import {HeaderRenderer} from "./HeaderRenderer";
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
                        return <BatchRenderer batch={gantObject.content}/>
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