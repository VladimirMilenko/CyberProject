import {StageViewProperty} from "./StageViewProperty";
import React from 'react';
import {BatchStageModel} from "../../../../Models/BatchStageModel";
import {ViewPropertyType} from "../AbstractViewProperty";
import moment from 'moment/moment';
import ReactElement = React.ReactElement;
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
        let days = object.plannedEndDate.diff(object.plannedStartDate, 'days') + 1;
        let result =  moment.duration(days, 'days').locale('ru').humanize(false);
        return (

            <td key="stagePlannedDuration" style={{background:background}} className="rst__table__cell">{result}</td>
        );
    }

    renderHeader(): ReactElement<any> {
        return <td key="stagePlannedDuration" className="rst__table__cell__header">Длительность</td> ;
    }

}
