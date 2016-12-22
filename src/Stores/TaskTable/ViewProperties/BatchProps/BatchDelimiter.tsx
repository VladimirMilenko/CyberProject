import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import {BatchModel} from "../../../../Models/BatchModel";
import React from 'react';
import ReactElement = React.ReactElement;
import {observable, action} from "mobx";

export class BatchDelimiter extends BatchViewProperty{
    @observable collapsed:boolean = false;
    callback:(val:boolean)=>void;
    required: boolean = true;
    enabled: boolean = true;
    viewPropertyType: ViewPropertyType;

    constructor(callback:(val:boolean)=>void){
        super();
        this.callback = callback;
    }

    render(object: BatchModel): ReactElement<any> {
        return (
            <td key="batchDelimiter" className="rst__table__cell">

            </td>
        );
    }
    setCollapsed(value:boolean){
        console.log(value);
        this.collapsed = value;
        this.callback(value);
    }
    renderHeader(): ReactElement<any> {
        if(this.collapsed){
            return(
                <td key="collapse-btn" style={{minWidth: 20, height: 'auto'}} className="rst__table__cell__header">
                    <span onClick={(e) => {this.setCollapsed(false);}} className="icon icon-arrows_right"/>
                </td>
            )
        }
        return (
            <td key="collapse-btn" style={{minWidth: 20, height: 'auto'}} className="rst__table__cell__header">
                <span onClick={(e) => {this.setCollapsed(true);}} className="icon icon-arrows_left"/>
            </td>
        ) ;
    }

}