import React from 'react';
import {ViewSettings} from "../Stores/ViewSettingsStore/ViewSettings";
import {observer, inject} from "mobx-react";

interface GHProps {
    viewSettings?: ViewSettings
}
@inject("viewSettings")
@observer
export default class GantHeader extends React.Component<GHProps,{}> {
    render() {
        let {viewSettings} = this.props;
        let headerSubItems = this.props.viewSettings.headerSubItems;
        let headerSubItemsArray: Array<number> = [];
        if (headerSubItems == 24) {
            for (let i = 0; i < 24; i++)
                headerSubItemsArray.push(i);
        } else {
            if (headerSubItems == 4)
                headerSubItemsArray = [0, 6, 12, 18];
        }
        return (
            <div className="d-table__row d-table__row_type_head" style={{left:0,height:35}}>
                {viewSettings.headerItems.map((item, index) => {
                    if (item.isWeekend) {
                        return (
                            <div style={{width: viewSettings.cellWidth}} key={'key-' + item.title + '-' + index}
                                 className="d-table__cell d-table__cell_weekend_true">
                                <div style={{borderBottom: '1px solid #cddae4'}}>
                                    {item.title}
                                </div>

                                <div>
                                    {headerSubItemsArray.map((item, index) => {
                                        return (<div key={index} style={{
                                            borderRight: index == headerSubItems - 1 ? '0' : '1px solid #cddae4',
                                            display: 'inline-block',
                                            width: 100 / headerSubItems + '%'
                                        }}> {item}
                                        </div>)
                                    })}
                                </div>
                            </div>
                        )
                    }
                    return (

                        <div style={{width: viewSettings.cellWidth + 'px'}} key={'key-' + item.title + '-' + index}
                             className="d-table__cell">
                            <div style={{borderBottom: '1px solid #cddae4'}}>
                                {item.title}
                            </div>
                            <div>
                                {headerSubItemsArray.map((item, index) => {
                                    return (<div key={index} style={{
                                        borderRight: index == headerSubItems - 1 ? '0' : '1px solid #cddae4',
                                        display: 'inline-block',
                                        width: 100 / headerSubItems + '%'
                                    }}> {item}
                                    </div>)
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}