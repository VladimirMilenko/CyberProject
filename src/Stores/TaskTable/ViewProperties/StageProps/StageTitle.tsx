import {StageViewProperty} from "./StageViewProperty";
import React from 'react';
import {BatchStageModel} from "../../../../Models/BatchStageModel";
import {ViewPropertyType} from "../AbstractViewProperty";
import {ReactElement} from "react";
import Icon from "antd/lib/Icon";

export class StageTitle extends StageViewProperty {
    required: boolean = true;
    enabled: boolean = true;
    viewPropertyType: ViewPropertyType;

    value: string = "";
    editing: boolean = false;

    render(object: BatchStageModel): ReactElement<any> {
        let background = 'white';
        if (object.howered)
            background = '#b8fde3';
        if (object.selected)
            background = '#40ffad';


        return (
            <td key="stageTitle" style={{background:background}}
                className="rst__table__cell">
                {object.title}
            </td>
        );
    }
    edit(){
        this.editing = true;
    }
    saveChanges() {

    }

    renderHeader(): ReactElement<any> {
        return <td key="stageTitle" className="rst__table__cell__header">Операция</td> ;
    }

}
