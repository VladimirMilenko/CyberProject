import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import React,{ReactElement} from 'react';
import {BatchModel} from "../../../../Models/BatchModel";
import {observable, action} from "mobx";
import moment from 'moment';
import classNames from "classnames";
import Icon from "antd/lib/icon";
import Input from "antd/lib/input";

const containerStyle = {
    position: 'relative',
    paddingRight: 50
};
const spanStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    right: 0
};

const editIconStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    right: 20
}

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
        if (!object.detailsEditing) {
            return (
                <td className="rst__table__cell rst__table__cell__title" key="batchDetailsNumber"
                    style={{...containerStyle, background:background}}>
                    {object.detailsNumber}

                    <Icon
                        type="edit"
                        className="editable-cell-icon"
                        style={editIconStyle}
                        onClick={() => {
                        this.edit(object)
                    }}/>
                </td>
            )
        }
        else {
            return (
                <td className="rst__table__cell rst__table__cell__title" key="batchDetailsNumber"
                    style={{...containerStyle, background:background}}>
                    <Input
                        style={{minWidth:120}}
                        value={object.tempDetailsNumber}
                        onChange={(e:any)=>{
                            object.tempDetailsNumber = e.target.value
                        }}
                        onPressEnter={(e)=>{
                            this.saveChanges(object)
                        }}
                    />
                    <Icon
                        type="check"
                        style={editIconStyle}
                        className="editable-cell-icon-check"
                        onClick={(e)=>{
                            this.saveChanges(object)
                        }}
                    />
                </td >
            )
        }

    }

    edit(object: BatchModel) {
        object.detailsEditing = true;
        object.tempDetailsNumber = object.detailsNumber;
    }

    @action
    saveChanges(object: BatchModel) {
        object.detailsNumber = object.tempDetailsNumber;
        object.detailsEditing = false;
        object.plannedStartDate = moment(object.plannedStartDate);
        let currentDate = moment(object.plannedStartDate);
        for(let stage of object.batchStageSet){
            stage.plannedStartDate = moment(currentDate);
            let hours = object.store.pathConstructionAlgorithm.workerTime(object.detailsNumber,stage.worker.specialization,stage.worker,currentDate,stage.equipment,stage.baseDuration,stage);
            currentDate = moment(currentDate.add(hours.duration,'h'));
            stage.plannedEndDate = moment(currentDate);
        }
        object.plannedEndDate = moment(currentDate);
    }

}