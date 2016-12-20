import {ReactElement} from "react";
import {AbstractViewProperty} from "../AbstractViewProperty";
import {BatchStageModel} from "../../../../Models/BatchStageModel";
export abstract class StageViewProperty extends AbstractViewProperty{
    abstract render(object:BatchStageModel):ReactElement<any>;
    abstract renderHeader():ReactElement<any>;
}
