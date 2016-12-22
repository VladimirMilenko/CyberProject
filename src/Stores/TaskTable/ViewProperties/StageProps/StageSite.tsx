import {StageViewProperty} from "./StageViewProperty";
import React from 'react';
import {BatchStageModel} from "../../../../Models/BatchStageModel";
import {ViewPropertyType} from "../AbstractViewProperty";
import ReactElement = React.ReactElement;
export class StageSite extends StageViewProperty{
    required: boolean = true;
    enabled: boolean = true;
    viewPropertyType: ViewPropertyType;

    render(object: BatchStageModel): ReactElement<any> {
        let background = 'white';
        if(object.howered)
            background = '#b8fde3';
        if(object.selected)
            background = '#40ffad';
        let site = 'Не указано';
        if(object.equipment && object.equipment.site && object.equipment.site.name)
            site = object.equipment.site.name
        return (
            <td key="stageSite" style={{background:background}} className="rst__table__cell">{site}</td>
        );
    }

    renderHeader(): ReactElement<any> {
        return <td key="stageSite" className="rst__table__cell__header">Место</td> ;
    }

}
