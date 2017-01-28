import React, {Component} from "react";
import {inject} from "mobx-react";
import {CyberObjectsStore} from "../Stores/CyberObjectsStore/CyberObjectsStore";
import moment from "moment";
import Moment = moment.Moment;
import {WorkerModel} from "../Models/WorkerModel";
import {CalendarStore} from "../Stores/CalendarStore/CalendarStore";
import {isNullOrUndefined} from "util";
import {observer} from "mobx-react";
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";
import Card from "antd/lib/card";

interface CalendarProps {
    calendarStore?: CalendarStore
}
interface CalendarState {
    currentDate: Moment
}

@inject("calendarStore")
@observer
export class Calendar extends Component<CalendarProps,CalendarState> {
    constructor() {
        super();
        let currentMonth = moment();
        let currentDate = new Date(currentMonth.year(), currentMonth.month(), 1);
        this.state = {
            currentDate: moment(currentDate)
        }
    }

    getDaysArray(year, month) {
        let days = [];
        let range = Calendar.getMonthDateRange(year, month);
        let weekDay = range.start.weekday();
        let start = moment(this.state.currentDate);
        if (weekDay > 1) {
            let nStart = range.start.add(-range.start.weekday(), 'd');

            for (let i = 0; i < weekDay; i++) {

                days.push(moment(nStart));
                nStart = nStart.add(1, 'd');
            }
            start = nStart;
        }
        let daysNumber = Math.ceil(moment.duration(moment(range.end).diff(range.start)).asDays())
        for (let i = 0; i < daysNumber; i++) {

            days.push(moment(start));
            start = start.add(1, 'd');
        }

        while (days.length % 7 !== 0) {
            start = start.add(1, 'd');
            days.push(moment(start));
        }
        console.log(days);
        return days;
    }

    static getMonthDateRange(year, month) {
        let moment = require('moment');
        let startDate = moment([year, month]);
        let endDate = moment(startDate).endOf('month');

        return {start: startDate, end: endDate};
    }

    renderLine(days) {

        let {selectedWorker} = this.props.calendarStore;
        if (isNullOrUndefined(selectedWorker))
            return (
                <tr key={Math.random()}/>
            )
        return (
            <tr key={Math.random()} className="calendar_table__row">
                {days.map((day, index) => {
                    let isBusyDay = false;
                    if (!selectedWorker.isWorkingAtDate(day))
                        isBusyDay = true;
                    if (day.month() !== this.state.currentDate.month()) {
                        return (
                            <td key={index} className="calendar_table__cell_state_disabled">
                                <span className="calendar__day">
                                </span>
                            </td>
                        )
                    }
                    if (day.isoWeekday() >= 6) {
                        return (
                            <td key={index} className="calendar_table__cell" style={{background:'#ffe6f8'}}>
                                <span className="calendar__day">
                                    {day.format("DD")}
                                </span>
                            </td>
                        )
                    }
                    return (
                        <td key={index} className="calendar_table__cell" style={{position:'relative'}}>
                            <header>
                                <span className="calendar__day">
                                  {day.format("DD")}
                                </span>
                            </header>
                            {
                                (() => {
                                    console.log(day.format("DD.MM.YYYY") + " " + isBusyDay);
                                    if (isBusyDay) {
                                        return (
                                            <footer
                                                style={{height:'30px',width:'100%',position:'absolute',bottom:'0',left:'0'}}>
                                                <div
                                                    style={{display:'block',width:'100%',height:'100%', background:'#50e3c2'}}>
                                                </div>
                                            </footer>
                                        )
                                    }
                                })()
                            }
                        </td>)
                })}
            </tr>
        )
    }

    renderDays(days) {
        let result = [];
        for (let i = 0; i < days.length / 7; i++) {
            let tDays = [];
            for (let j = 0; j < 7; j++) {
                tDays.push(days[7 * i + j]);
            }
            result.push(this.renderLine(tDays));
        }
        return result;
    }

    subtractMonth() {
        this.setState({
            currentDate: moment(this.state.currentDate.add(-1, 'M'))
        })
    }

    addMonth() {
        this.setState({
            currentDate: moment(this.state.currentDate.add(1, 'M'))
        })
    }

    render() {
        return (
            <Col span={24}>
                <Row>
                    <Col span={24}>
                          <span className="date_navigation widget__header_float_left">
                            <span className="date_navigation__link">
                              {moment(this.state.currentDate).add(-1, 'M').format("MMMM")}
                            </span>
                            <div className="date_navigation__link date_navigation__link_state_active"
                                 style={{width: '200px', display: 'inline-block'}}>
                              <span onClick={()=>{
                                  this.subtractMonth()}}>
                                <i className="icon-arrow_left" style={{margin: '0 5px', cursor: 'pointer'}}
                                />
                              </span>
                              <span>
                                {this.state.currentDate.format("MMMM, Y")}
                              </span>
                              <span onClick={()=>{this.addMonth()}}>
                                <i className="icon-arrow_right" style={{margin: '0 5px', cursor: 'pointer'}}
                                />
                              </span>
                            </div>
                            <span className="date_navigation__link">
                              {moment(this.state.currentDate).add(1, 'M').format("MMMM")}
                            </span>
                          </span>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col span={24}>
                                <table className="calendar_table">
                                    <thead className="calendar_table__head">
                                    <tr>
                                        <th className="calendar__head__cell">пн</th>
                                        <th className="calendar__head__cell">вт</th>
                                        <th className="calendar__head__cell">ср</th>
                                        <th className="calendar__head__cell">чт</th>
                                        <th className="calendar__head__cell">пт</th>
                                        <th className="calendar__head__cell">сб</th>
                                        <th className="calendar__head__cell">вс</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.renderDays(this.getDaysArray(this.state.currentDate.year(), this.state.currentDate.month()))}
                                    </tbody>
                                </table>
                            </Col>
                            <Col span={24}>
                                <Row >
                                    <Col span={12} style={{marginTop:40}}>
                                        <div style={{textAlign:'center', verticalAlign:'middle'}}>
                                            <div
                                                style={{ display:'inline-block',margin:'0 5px', height:'30px', width:'30px',borderRadius: '3px', backgroundColor: '#ffdef7',border: 'solid 1px #a6b9c8', float:'left'}}>
                                            </div>
                                            <p style={{float:'left',fontSize:'12px',marginTop:'6px', marginLeft:'16px'}}>
                                                Выходные дни
                                            </p>
                                        </div>
                                    </Col>
                                    <Col span={12} style={{marginTop:40}}>
                                        <div style={{textAlign:'center', verticalAlign:'middle'}}>
                                            <div
                                                style={{ display:'inline-block',margin:'0 5px', height:'30px', width:'30px',borderRadius: '3px', backgroundColor: '#3fe1b5',border: 'solid 1px #a6b9c8', float:'left'}}>
                                            </div>
                                            <p style={{float:'left',fontSize:'12px',marginTop:'6px', marginLeft:'16px'}}>
                                                Занят
                                            </p>
                                        </div>
                                    </Col >
                                    <Col span={12} style={{marginTop:20}}>
                                        <div style={{textAlign:'center', verticalAlign:'middle'}}>
                                            <div
                                                style={{ display:'inline-block',margin:'0 5px', height:'30px', width:'30px',borderRadius: '3px', backgroundColor: '#white',border: 'solid 1px #a6b9c8', float:'left'}}>
                                            </div>
                                            <p style={{float:'left',fontSize:'12px',marginTop:'6px', marginLeft:'16px'}}>
                                                Рабочие дни
                                            </p>
                                        </div>
                                    </Col>
                                    <Col
                                        span={12} style={{marginTop:20}}>
                                        <div style={{textAlign:'center', verticalAlign:'middle'}}>
                                            <div
                                                style={{ display:'inline-block',margin:'0 5px', height:'30px', width:'30px',borderRadius: '3px', backgroundColor: '#c5009e',border: 'solid 1px #a6b9c8', float:'left'}}>
                                            </div>
                                            <p style={{float:'left',fontSize:'12px',marginTop:'6px', marginLeft:'16px'}}>
                                                Праздничные дни
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        )
    }


}