import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import React,{ReactElement} from 'react';
import {BatchModel} from "../../../../Models/BatchModel";
export class BatchPlannedStartDateVP extends BatchViewProperty{
    requried: boolean = true;
    enabled: boolean = true;
    viewPropertyType: ViewPropertyType;
    renderHeader(): ReactElement<any> {
        return <td className="rst__table__cell__header">Дата начала</td>;
    }
    render(object: BatchModel): ReactElement<any> {
        return <td className="rst__table__cell"><span>{object.formattedStartDate}</span></td>;
    }

}