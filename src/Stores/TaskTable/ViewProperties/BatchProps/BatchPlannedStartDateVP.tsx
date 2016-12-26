import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import React,{ReactElement} from 'react';
import {BatchModel} from "../../../../Models/BatchModel";
import {observable} from "mobx";
import {CyberObjectsStore} from "../../../CyberObjectsStore/CyberObjectsStore";

const containerStyle ={
    position:'relative',
    paddingRight:30
};
const spanStyle = {
    paddingTop:10,
    paddingBottom:10,
    position:'absolute',
    right:0
};
export class BatchPlannedStartDateVP extends BatchViewProperty{
    required: boolean = false;
    @observable enabled: boolean = true;
    viewPropertyType: ViewPropertyType;
    private store: CyberObjectsStore;
    renderHeader(): ReactElement<any> {
        if (this.store.orderedBy == 'plannedStartDate') {
            if(this.store.orderState == 1)
                return (
                    <td key="batchPlannedStartDate" style={containerStyle} className="rst__table__cell__header">
                        Дата начала
                        <span className="anticon anticon-arrow-down" onClick={(e) => this.orderClicked()} style={spanStyle}/>
                    </td>
                );
            else
                return (
                    <td key="batchPlannedStartDate" style={containerStyle} className="rst__table__cell__header">
                        Дата начала
                        <span className="anticon anticon-arrow-up" onClick={(e) => this.orderClicked()} style={spanStyle}/>
                    </td>
                );
        }
        return (
            <td key="batchPlannedStartDate" style={containerStyle} className="rst__table__cell__header">
                Дата начала
                <span className="anticon anticon-arrow-down" onClick={(e) => this.orderClicked()} style={spanStyle}/>
            </td>
        );
    }
    orderClicked(){
        this.store.orderBy('plannedStartDate');
    }

    constructor(store:CyberObjectsStore){
        super();
        this.store = store;
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