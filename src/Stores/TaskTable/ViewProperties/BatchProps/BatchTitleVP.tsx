import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import {BatchModel} from "../../../../Models/BatchModel";
import React, {ReactElement} from "react";
import {observable} from "mobx";
import classNames from "classnames";
import Icon from "antd/lib/Icon";
import Input from "antd/lib/input/Input";


const containerStyles = require('./styles/table.scss');

const containerStyle = {
    position: 'relative',
    paddingRight: 50
};
const spanStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    right: 0
};

const editIconStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    right: 20
}

export class BatchTitleVP extends BatchViewProperty {
    renderHeader(): ReactElement<any> {
        return <td key="batchTitle" className="rst__table__cell__header">Код партии</td>;
    }

    editing: boolean = false;
    required: boolean = true;
    @observable enabled: boolean = true;
    viewPropertyType: ViewPropertyType = ViewPropertyType.Text;

    tempValue: string = "";
    @observable editIconVisible = false;

    render(object: BatchModel): ReactElement<any> {

        let background = 'white';
        if (object.howered)
            background = '#ffecbe';
        if (object.selected)
            background = '#ffc842';

        if (!object.titleEditing) {
            return (
                <td className="rst__table__cell rst__table__cell__title" key="batchTitle"
                    style={{...containerStyle, background:background}}>
                    {object.title}

                    <Icon
                        type="edit"
                        className="editable-cell-icon"
                        style={editIconStyle}
                        onClick={() => {
                        this.edit(object)
                    }}/>

                    <span style={spanStyle}
                          className={classNames({
                                  "icon":true,
                                  "icon-arrows_up":object.batchStageLinks.length>0 && object.expanded,
                                  "icon-arrows_down":object.batchStageLinks.length>0 && !object.expanded
                              })}
                          onClick={(e)=>{
                                    object.expanded = !object.expanded;
                          }}>
                    </span>

                </td>
            )
        }
        else {
            return (
                <td className="rst__table__cell rst__table__cell__title" key="batchTitle"
                    style={{...containerStyle, background:background}}>
                    <Input
                        style={{minWidth:120}}
                        value={object.tempTitle}
                        onChange={(e:any)=>{
                            object.tempTitle = e.target.value
                        }}
                        onPressEnter={(e)=>{
                            this.saveChanges(object)
                        }}
                    />
                    <Icon
                        type="check"
                        style={editIconStyle}
                        className="editable-cell-icon-check"
                        onClick={(e)=>{
                            this.saveChanges(object)
                        }}
                    />
                </td >
            )
        }

    }

    edit(object: BatchModel) {
        object.titleEditing = true;
        object.tempTitle = object.title;
    }

    saveChanges(object: BatchModel) {
        object.title = object.tempTitle;
        object.titleEditing = false;
    }

}
