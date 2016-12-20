import {StageViewProperty} from "./StageViewProperty";
import React from 'react';
import {BatchStageModel} from "../../../../Models/BatchStageModel";
import {ViewPropertyType} from "../AbstractViewProperty";
import ReactElement = React.ReactElement;
export class StageTitle extends StageViewProperty{
    requried: boolean = true;
    enabled: boolean = true;
    viewPropertyType: ViewPropertyType;

    render(object: BatchStageModel): ReactElement<any> {
        return (
            <td className="rst__table__cell">{object.title}</td>
        );
    }

    renderHeader(): ReactElement<any> {
        return <td className="rst__table__cell__header">Название</td> ;
    }

}
