import {StageViewProperty} from "./StageViewProperty";
import React from 'react';
import {BatchStageModel} from "../../../../Models/BatchStageModel";
import {ViewPropertyType} from "../AbstractViewProperty";
import {ReactElement} from "react";

import DatePicker from "antd/lib/date-picker";
import moment from "moment";


export class StagePlannedStartDate extends StageViewProperty{
    required: boolean = true;
    enabled: boolean = true;
    viewPropertyType: ViewPropertyType;

    render(object: BatchStageModel): ReactElement<any> {
        let background = 'white';
        if(object.howered)
            background = '#b8fde3';
        if(object.selected)
            background = '#40ffad';

        return (
            <td key="stagePlannedStartDate" style={{background:background}} className="rst__table__cell">
                <DatePicker
                    allowClear={false}
                    size="default"
                    showTime={false}
                    value={object.plannedStartDate}
                    format="DD.MM.YYYY"
                    placeholder="Укажите дату"
                    onChange={(data) => {
                    object.plannedStartDate = moment(data);
                }}
                    locale={{
                    lang: {
                        today: 'Сегодня'
                    }
                }}>
                </DatePicker>
            </td>
        );
    }

    renderHeader(): ReactElement<any> {
        return <td key="stagePlannedStartDate" className="rst__table__cell__header">Дата начала</td> ;
    }

}
