import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import React, {ReactElement} from 'react';
import {BatchModel} from "../../../../Models/BatchModel";
import {observable} from "mobx";
import Icon from "antd/lib/icon";

export class BatchDeleteVP extends BatchViewProperty {
    required: boolean = true;
    @observable enabled: boolean = true;
    viewPropertyType: ViewPropertyType;

    renderHeader(): ReactElement<any> {
        return <td key="batchDelete" className="rst__table__cell__header rst__table__cell_status"
                   style={{minWidth: 20, height: 'auto', borderBottom: '1px solid rgb(205, 218, 228)'}}/>;
    }

    render(object: BatchModel): ReactElement<any> {
        let background = 'white';
        if (object.howered)
            background = '#ffecbe';
        if (object.selected)
            background = '#ffc842';
        return (
            <td key="batchDelete" className="rst__table__cell rst__table__cell_status" style={{background, borderBottom:'1px solid white'}}>
            <span>
                 <Icon
                     type="delete"
                     className="editable-cell-icon-delete"
                     onClick={(e)=>{
                            object.store.removeBatch(object);
                        }}
                 />
            </span>
            </td>
        );
    }

}