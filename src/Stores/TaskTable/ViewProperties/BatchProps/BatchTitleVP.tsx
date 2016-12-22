import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import {BatchModel} from "../../../../Models/BatchModel";
import React,{ReactElement} from "react";
import {observable} from "mobx";

const spanStyle = {
    paddingTop:10,
    paddingBottom:10,
    float:'right'
};

export class BatchTitleVP extends BatchViewProperty{
    renderHeader(): ReactElement<any> {
        return <td key="batchTitle" className="rst__table__cell__header">Код партии</td>;
    }
    required: boolean = true;
    @observable enabled: boolean = true;
    viewPropertyType: ViewPropertyType = ViewPropertyType.Text;

    render(object: BatchModel): ReactElement<any> {
        let background = 'white';
        if(object.howered)
            background = '#ffecbe';
        if(object.selected)
            background = '#ffc842';
        if(object.batchStageLinks.length>0){
            if(object.expanded){
                return(<td className="rst__table__cell rst__table__cell__title"  key="batchTitle" style={{background:background}}>
                    {object.title}
                    <span style={spanStyle} className="icon icon-arrows_up" onClick={(e)=>{
                        object.expanded = false;
                    }}>
                    </span>
                    </td>
                )
            }else{
                return(<td className="rst__table__cell  rst__table__cell__title"  key="batchTitle" style={{background:background}}>
                        {object.title}
                        <span style={spanStyle} className="icon icon-arrows_down" onClick={(e)=>{
                        object.expanded = true;
                    }}>
                    </span>
                    </td>
                )
            }
        }
        return (
            <td className="rst__table__cell  rst__table__cell__title" key="batchTitle" style={{background:background}}>{object.title}
            </td>
        )
    }

}
