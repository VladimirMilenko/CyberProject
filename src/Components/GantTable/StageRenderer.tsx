import React from 'react';
import {inject, observer} from "mobx-react";
import {TaskTableViewMode} from "../../Stores/TaskTable/TaskTableViewMode";
import {BatchModel} from "../../Models/BatchModel";
import {ReactElement} from "react";
import {BatchStageModel} from "../../Models/BatchStageModel";
import {ViewSettings} from "../../Stores/ViewSettingsStore/ViewSettings";
import {BatchStatusVP} from "../../Stores/TaskTable/ViewProperties/BatchProps/BatchStatusVP";
import {BatchDeleteVP} from "../../Stores/TaskTable/ViewProperties/BatchProps/BatchDeleteVP";
interface StageRendererProps {
    taskTableViewMode?: TaskTableViewMode,
    stage: BatchStageModel,
    viewSettings?: ViewSettings
}
@inject("taskTableViewMode", "viewSettings")
@observer
export class StageRenderer extends React.Component<StageRendererProps,{}> {
    hoverObject() {
        this.props.viewSettings.setHoweredObject(this.props.stage.uuid);
    }

    removeHover() {
        this.props.viewSettings.setHoweredObject('');
    }

    selectObject() {
        this.props.viewSettings.setSelectedObject(this.props.stage.uuid);
    }

    removeSelection() {
        this.props.viewSettings.setSelectedObject('');
    }

    render() {
        let {stageViewProperties, batchViewProperties, batchDelimiter} = this.props.taskTableViewMode;
        let {stage} = this.props;
        let batchCells: Array<ReactElement<any>> = [];
        let enabledBatchViews = batchViewProperties.filter(view => view.enabled);
        enabledBatchViews.map((bv, index) => {
            if (bv instanceof BatchStatusVP || bv instanceof BatchDeleteVP) {
                batchCells.push(
                    <td key={`batchView-${index}`} className="rst__table__cell rst__table__cell_status"/>
                )
            } else {
                batchCells.push(<td key={`batchView-${index}`} className="rst__table__cell"/>)
            }
        });
        batchCells.push(batchDelimiter.render(null));
        let enabledStageViews = stageViewProperties.filter(view => view.enabled);
        enabledStageViews.map((stageView, index) => {
            batchCells.push(
                stageView.render(stage)
            )
        });
        return (
            <tr datatype="task" onClick={(e)=>this.selectObject()} onMouseOver={(e)=>this.hoverObject()}
                onMouseLeave={(e)=>this.removeHover()}>
                {batchCells}
            </tr>
        )
    }
}