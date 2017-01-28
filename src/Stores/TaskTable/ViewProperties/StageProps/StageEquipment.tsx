import {StageViewProperty} from "./StageViewProperty";
import React from 'react';
import {BatchStageModel} from "../../../../Models/BatchStageModel";
import {ViewPropertyType} from "../AbstractViewProperty";
import {ReactElement} from "react";
export class StageEquipment extends StageViewProperty{
    required: boolean = true;
    enabled: boolean = true;
    viewPropertyType: ViewPropertyType;

    render(object: BatchStageModel): ReactElement<any> {
        let background = 'white';
        if(object.howered)
            background = '#b8fde3';
        if(object.selected)
            background = '#40ffad';
        let equipment = 'Не указано';
        if(object.equipment && object.equipment.name)
            equipment = object.equipment.name;
        return (
            <td key="stageEquipment" style={{background:background}} className="rst__table__cell">{equipment}</td>
        );
    }

    renderHeader(): ReactElement<any> {
        return <td key="stageEquipment" className="rst__table__cell__header">Инструмент</td>;
    }

}
