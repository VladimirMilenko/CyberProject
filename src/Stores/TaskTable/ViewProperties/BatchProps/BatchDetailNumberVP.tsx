import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import React,{ReactElement} from 'react';
import {BatchModel} from "../../../../Models/BatchModel";
import {observable} from "mobx";
export class BatchDetailNumberVP extends BatchViewProperty{
    required: boolean = false;
    @observable enabled: boolean = true;
    viewPropertyType: ViewPropertyType;
    renderHeader(): ReactElement<any> {
        return <td key="batchDetailNumber" className="rst__table__cell__header">Кол-во</td>;
    }
    render(object: BatchModel): ReactElement<any> {
        let background = 'white';
        if(object.howered)
            background = '#ffecbe';
        if(object.selected)
            background = '#ffc842';
        return <td key="batchDetailNumber" className="rst__table__cell" style={{background}}><span>{object.detailsNumber}</span></td>;
    }

}