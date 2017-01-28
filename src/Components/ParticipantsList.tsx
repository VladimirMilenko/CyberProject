import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {CyberObjectsStore} from "../Stores/CyberObjectsStore/CyberObjectsStore";
import {WorkerModel} from "../Models/WorkerModel";
import {CalendarStore} from "../Stores/CalendarStore/CalendarStore";
import {isNullOrUndefined} from "util";

interface ParticipantsListProps {
    cyberObjectsStore?: CyberObjectsStore;
    calendarStore?: CalendarStore

}

@inject("cyberObjectsStore", "calendarStore")
@observer
export class ParticipantsList extends Component<ParticipantsListProps,{}> {

    selectWorker(worker: WorkerModel) {
        this.props.calendarStore.selectedWorker = worker;
    }
    componentDidMount(){
        if(isNullOrUndefined(this.props.calendarStore.selectedWorker)){
            if(this.props.cyberObjectsStore.workers.objects.length>0){
                this.props.calendarStore.selectedWorker = this.props.cyberObjectsStore.workers.objects[0];
            }
        }
    }
    render() {
        let workers = this.props.cyberObjectsStore.workers.objects;
        let selectedWorker = this.props.calendarStore.selectedWorker;

        return (
            <table className="table" style={{marginTop:44}}>
                <tbody>
                {workers.map((worker) => {
                        let cellStyle = {
                            width: '50%', background: worker === selectedWorker ? '#c2e8e8' : 'white', cursor: 'pointer'
                        }
                        return (
                            <tr key={worker.uuid} onClick={()=>{this.selectWorker(worker)}} className="table__row">
                                <td className="table__cell"
                                    style={cellStyle}>{worker.name}</td>
                                <td className="table__cell"
                                    style={cellStyle}/>
                            </tr>)
                    }
                )}
                </tbody>
            </table>
        )
    }

}