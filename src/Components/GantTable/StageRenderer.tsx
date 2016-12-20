import React from 'react';
import {inject, observer} from "mobx-react";
import {TaskTableViewMode} from "../../Stores/TaskTable/TaskTableViewMode";
import {BatchModel} from "../../Models/BatchModel";
import {ReactElement} from "react";
import {BatchStageModel} from "../../Models/BatchStageModel";
interface StageRendererProps{
    taskTableViewMode?:TaskTableViewMode,
    stage:BatchStageModel
}
@inject("taskTableViewMode")
@observer
export class StageRenderer extends React.Component<StageRendererProps,{}>{
    render(){
        let {stageViewProperties,batchViewProperties} = this.props.taskTableViewMode;
        let {stage} = this.props;
        let batchCells: Array<ReactElement<any>> = [];
        let enabledBatchViews = batchViewProperties.filter(view => view.enabled);
        for (let batchViewMode of enabledBatchViews) {
            batchCells.push(
                <td className="rst__table__cell" />
            )
        }
        let enabledStageViews = stageViewProperties.filter(view=>view.enabled);
        for(let stageViewMode of enabledStageViews){
            batchCells.push(
                <td className="rst__table__cell"/>
            )
        }
        return(
            <tr>
                {batchCells}
            </tr>
        )
    }
}