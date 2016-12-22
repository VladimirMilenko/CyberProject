import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import React, {ReactElement} from 'react';
import {BatchModel} from "../../../../Models/BatchModel";
import {observable} from "mobx";
export class BatchStatusVP extends BatchViewProperty {
    required: boolean = true;
    @observable enabled: boolean = true;
    viewPropertyType: ViewPropertyType;

    renderHeader(): ReactElement<any> {
        return <td key="batchStatus" className="rst__table__cell__header rst__table__cell_status"
                   style={{minWidth: 20, height: 'auto', borderBottom: '1px solid rgb(205, 218, 228)'}}/>;
    }

    render(object: BatchModel): ReactElement<any> {
        let background = 'white';
        if (object.howered)
            background = '#ffecbe';
        if (object.selected)
            background = '#ffc842';


        let bgColor = 'white';
        switch (object.status) {
            case 'ok':
                bgColor = 'green';
                break;
        }
        let statusBlock = <span style={{
                        display: 'inline-block',
                        width: 15,
                        height: 15,
                        border: '1px solid #cddae4',
                        borderRadius: '2px',
                        background: bgColor
                    }}>

                    </span>


        return (
            <td key="batchStatus" className="rst__table__cell rst__table__cell_status" style={{background, borderBottom:'1px solid white'}}>
            <span>
                {statusBlock}
            </span>
            </td>
        );
    }

}