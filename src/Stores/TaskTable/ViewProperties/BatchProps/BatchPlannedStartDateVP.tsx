import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import React,{ReactElement} from 'react';
import {BatchModel} from "../../../../Models/BatchModel";
import {observable} from "mobx";
export class BatchPlannedStartDateVP extends BatchViewProperty{
    requried: boolean = false;
    @observable enabled: boolean = true;
    viewPropertyType: ViewPropertyType;
    renderHeader(): ReactElement<any> {
        return <td key="batchPlannedStartDate" className="rst__table__cell__header">Дата начала</td>;
    }
    render(object: BatchModel): ReactElement<any> {
        let background = 'white';
        if(object.howered)
            background = '#ffecbe';
        if(object.selected)
            background = '#ffc842';
        return <td key="batchPlannedStartDate" className="rst__table__cell" style={{background}}><span>{object.formattedStartDate}</span></td>;
    }

}