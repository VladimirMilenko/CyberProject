import {observable} from "mobx";
import {WorkerModel} from "../../Models/WorkerModel";
export class CalendarStore {
    @observable selectedWorker: WorkerModel;
}