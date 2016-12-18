import {ReactElement} from "react";

export abstract class AbstractViewProperty{
    abstract propertyName:string;
    abstract propertyField:string;
    abstract type:ViewPropertyType;
    abstract requried:boolean;
    abstract objectType:ViewPropertyObjectType;
    abstract enabled:boolean;

    abstract render(object:any):ReactElement<any>;
}
export enum ViewPropertyObjectType{
    Common,
    Batch,
    Stage
}
export enum ViewPropertyType {
    Render,
    Text,
    Select
}