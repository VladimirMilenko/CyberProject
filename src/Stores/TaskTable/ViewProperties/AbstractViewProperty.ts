import {ReactElement} from "react";

export abstract class AbstractViewProperty{
    abstract requried:boolean;
    abstract enabled:boolean;
    abstract viewPropertyType:ViewPropertyType;
}
export enum ViewPropertyType {
    Render,
    Text,
    Select
}