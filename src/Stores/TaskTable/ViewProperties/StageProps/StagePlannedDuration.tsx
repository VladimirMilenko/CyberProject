import {StageViewProperty} from "./StageViewProperty";
import React from 'react';
import {BatchStageModel} from "../../../../Models/BatchStageModel";
import {ViewPropertyType} from "../AbstractViewProperty";
import moment from 'moment/moment';
import {ReactElement} from "react";
export class StagePlannedDuration extends StageViewProperty{
    required: boolean = true;
    enabled: boolean = true;
    viewPropertyType: ViewPropertyType;

    render(object: BatchStageModel): ReactElement<any> {
        let background = 'white';
        if(object.howered)
            background = '#b8fde3';
        if(object.selected)
            background = '#40ffad';
        let hours = object.plannedEndDate.diff(object.plannedStartDate, 'hours');
        let hoursCount = hours%24;
        let days = Math.trunc(hours/24);
        return (

            <td key="stagePlannedDuration" style={{background:background}} className="rst__table__cell">{days}d {hoursCount}h</td>
        );
    }

    renderHeader(): ReactElement<any> {
        return <td key="stagePlannedDuration" className="rst__table__cell__header">Длительность</td> ;
    }

}
