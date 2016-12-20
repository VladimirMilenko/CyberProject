import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import {BatchModel} from "../../../../Models/BatchModel";
import React,{ReactElement} from "react";
import {observable} from "mobx";
export class BatchTitleVP extends BatchViewProperty{
    renderHeader(): ReactElement<any> {
        return <td className="rst__table__cell__header">Название</td>;
    }
    requried: boolean = true;
    @observable enabled: boolean = true;
    viewPropertyType: ViewPropertyType = ViewPropertyType.Text;

    render(object: BatchModel): ReactElement<any> {
        let background = 'white';
        if(object.howered)
            background = '#ffecbe';
        if(object.selected)
            background = '#ffc842';
        return (
            <td className="rst__table__cell" key="title" style={{background:background}}>{object.title}</td>
        )
    }

}
