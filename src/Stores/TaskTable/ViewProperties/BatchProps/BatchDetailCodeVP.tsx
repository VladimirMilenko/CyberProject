import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import React,{ReactElement} from 'react';
import {BatchModel} from "../../../../Models/BatchModel";
import {observable} from "mobx";
export class BatchDetailCodeVP extends BatchViewProperty{
    required: boolean = false;
    @observable enabled: boolean = true;
    viewPropertyType: ViewPropertyType;
    renderHeader(): ReactElement<any> {
        return <td key="batchDetailCode" className="rst__table__cell__header">Код детали</td>;
    }
    render(object: BatchModel): ReactElement<any> {
        let background = 'white';
        if(object.howered)
            background = '#ffecbe';
        if(object.selected)
            background = '#ffc842';
        let name = "Не указано";
        if(object.route && object.route.name)
            name = object.route.name;
        return <td key="batchDetailCode" className="rst__table__cell" style={{background}}><span>{name}</span></td>;
    }

}