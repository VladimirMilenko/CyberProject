import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import React, {ReactElement} from 'react';
import {BatchModel} from "../../../../Models/BatchModel";
import {observable} from "mobx";
import {CyberObjectsStore} from "../../../CyberObjectsStore/CyberObjectsStore";
import {observer} from "mobx-react";
const spanStyle = {
    float: 'right',
    width: 10,
    height: 10,
    display: 'inline-block',
    padding: '10px 0'
};
export class BatchPlannedEndDateVP extends BatchViewProperty {


    required: boolean = false;
    @observable enabled: boolean = true;

    viewPropertyType: ViewPropertyType;
    private store: CyberObjectsStore;

    constructor(store: CyberObjectsStore) {
        super();
        this.store = store;
    }

    @observable renderHeader(): ReactElement<any> {
        if (this.store.orderedBy == 'plannedEndDate') {
            if(this.store.orderState == 1)
                return (
                    <td key="batchPlannedEndDate" className="rst__table__cell__header">
                        Дата конца
                        <span className="anticon anticon-arrow-down" onClick={(e) => this.orderClicked()} style={spanStyle}/>
                    </td>
                );
            else
                return (
                    <td key="batchPlannedEndDate" className="rst__table__cell__header">
                        Дата конца
                        <span className="anticon anticon-arrow-up" onClick={(e) => this.orderClicked()} style={spanStyle}/>
                    </td>
                );
        }
        return (
            <td key="batchPlannedEndDate" className="rst__table__cell__header">
                Дата конца
                <span className="anticon anticon-arrow-down" onClick={(e) => this.orderClicked()} style={spanStyle}/>
            </td>
        );
    }
    orderClicked(){
        this.store.orderBy('plannedEndDate');
    }
    @observable render(object: BatchModel): ReactElement<any> {
        let background = 'white';
        if (object.howered)
            background = '#ffecbe';
        if (object.selected)
            background = '#ffc842';
        return <td key="batchPlannedEndDate" className="rst__table__cell" style={{background}}>
            <span>{object.formattedEndDate}</span></td>;
    }

}