import {BatchViewProperty} from "./BatchViewProperty";
import {ViewPropertyType} from "../AbstractViewProperty";
import React, {ReactElement} from 'react';
import {BatchModel} from "../../../../Models/BatchModel";
import {observable} from "mobx";
import {CyberObjectsStore} from "../../../CyberObjectsStore/CyberObjectsStore";
import moment from "moment";
import DatePicker from "antd/lib/date-picker";

import {observer} from "mobx-react";
const containerStyle = {
    position: 'relative',
    paddingRight: 30
};
const spanStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    right: 0
};
export class BatchPlannedEndDateVP extends BatchViewProperty {


    required: boolean = false;
    @observable enabled: boolean = true;

    viewPropertyType: ViewPropertyType;
    private store: CyberObjectsStore;

    constructor(store: CyberObjectsStore) {
        super();
        this.store = store;
    }

    @observable renderHeader(): ReactElement<any> {
        if (this.store.orderedBy == 'plannedEndDate') {
            if (this.store.orderState == 1)
                return (
                    <td key="batchPlannedEndDate" style={containerStyle} className="rst__table__cell__header">
                        Дата конца
                        <span className="anticon anticon-arrow-down" onClick={(e) => this.orderClicked()}
                              style={spanStyle}/>
                    </td>
                );
            else
                return (
                    <td key="batchPlannedEndDate" style={containerStyle} className="rst__table__cell__header">
                        Дата конца
                        <span className="anticon anticon-arrow-up" onClick={(e) => this.orderClicked()}
                              style={spanStyle}/>
                    </td>
                );
        }
        return (
            <td key="batchPlannedEndDate" style={containerStyle} className="rst__table__cell__header">
                Дата конца
                <span className="anticon anticon-arrow-down" onClick={(e) => this.orderClicked()} style={spanStyle}/>
            </td>
        );
    }

    orderClicked() {
        this.store.orderBy('plannedEndDate');
    }

    @observable render(object: BatchModel): ReactElement<any> {
        let background = 'white';
        if (object.howered)
            background = '#ffecbe';
        if (object.selected)
            background = '#ffc842';
        return <td key="batchPlannedEndDate" className="rst__table__cell" style={{background}}>
            <DatePicker
                allowClear={false}
                size="default"
                showTime={false}
                value={object.plannedEndDate}
                format="DD.MM.YYYY"
                placeholder="Укажите дату"
                onChange={(data) => {
                    object.plannedEndDate = moment(data);
                }}
                locale={{
                    lang: {
                        today: 'Сегодня'
                    }
                }}>
            </DatePicker>
        </td>;
    }

}