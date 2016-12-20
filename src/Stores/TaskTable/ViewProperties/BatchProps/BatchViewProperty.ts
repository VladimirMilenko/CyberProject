import {BatchModel} from "../../../../Models/BatchModel";
import {ReactElement} from "react";
import {AbstractViewProperty} from "../AbstractViewProperty";
export abstract class BatchViewProperty extends AbstractViewProperty{
    abstract render(object:BatchModel):ReactElement<any>;
    abstract renderHeader():ReactElement<any>;
}
