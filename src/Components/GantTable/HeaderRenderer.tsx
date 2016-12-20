import React from 'react';
import {inject, observer} from "mobx-react";
import {TaskTableViewMode} from "../../Stores/TaskTable/TaskTableViewMode";
import {BatchModel} from "../../Models/BatchModel";
import {ReactElement} from "react";
interface GantTableHeaderRendererProps{
    taskTableViewMode?:TaskTableViewMode,
}
@inject("taskTableViewMode")
@observer
export class HeaderRenderer extends React.Component<GantTableHeaderRendererProps,{}>{
    render(){
        let {stageViewProperties,batchViewProperties} = this.props.taskTableViewMode;
        let rowCells: Array<ReactElement<any>> = [];
        let enabledBatchViews = batchViewProperties.filter(view => view.enabled);
        for (let batchViewMode of enabledBatchViews) {
            rowCells.push(
                batchViewMode.renderHeader()
            )
        }
        let enabledStageViews = stageViewProperties.filter(view=>view.enabled);
        for(let stageViewMode of enabledStageViews){
            rowCells.push(
                stageViewMode.renderHeader()
            )
        }
        return(
            <tr style={{height:35}}>
                {rowCells}
            </tr>
        )
    }
}