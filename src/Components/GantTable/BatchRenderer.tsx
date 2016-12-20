import React from 'react';
import {inject, observer} from "mobx-react";
import {TaskTableViewMode} from "../../Stores/TaskTable/TaskTableViewMode";
import {BatchModel} from "../../Models/BatchModel";
import {ReactElement} from "react";
import {ViewSettings} from "../../Stores/ViewSettingsStore/ViewSettings";
interface GantTableBatchRendererProps{
    taskTableViewMode?:TaskTableViewMode,
    batch:BatchModel,
    viewSettings?:ViewSettings
}
@inject("taskTableViewMode","viewSettings")
@observer
export class BatchRenderer extends React.Component<GantTableBatchRendererProps,{}>{

    hoverObject(){
        this.props.viewSettings.setHoweredObject(this.props.batch.uuid);
        console.log('over');
    }
    removeHover(){
        this.props.viewSettings.setHoweredObject('');
    }
    selectObject(){
        this.props.viewSettings.setSelectedObject(this.props.batch.uuid);
    }
    removeSelection(){
        this.props.viewSettings.setSelectedObject('');
    }
    render(){
        let {stageViewProperties,batchViewProperties} = this.props.taskTableViewMode;
        let {batch} = this.props;
        let batchCells: Array<ReactElement<any>> = [];
        let enabledBatchViews = batchViewProperties.filter(view => view.enabled);
        for (let batchViewMode of enabledBatchViews) {
            batchCells.push(
                batchViewMode.render(batch)
            )
        }
        let enabledStageViews = stageViewProperties.filter(view=>view.enabled);
        for(let stageViewMode of enabledStageViews){
            batchCells.push(
                <td className="rst__table__cell"/>
            )
        }
        return(
            <tr onMouseOver={(e)=>this.hoverObject()} onMouseLeave={(e)=>this.removeHover()}>
                {batchCells}
            </tr>
        )
    }
}