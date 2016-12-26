import {CyberObjectsStore} from "../Stores/CyberObjectsStore/CyberObjectsStore";
import {isNullOrUndefined} from "util";
import {RouteStageModel} from "../Models/RouteStageModel";
import {SpecializationModel} from "../Models/SpecializationModel";
import {WorkerModel} from "../Models/WorkerModel";
import moment from 'moment/moment';
import Moment = moment.Moment;
import {EquipmentModel} from "../Models/EquipmentModel";
import {Route} from "../Models/RouteModel";
export class SimpleCriticalPath{
    private store: CyberObjectsStore;
    constructor(store:CyberObjectsStore){
        this.store = store;
    }
    async buildCriticalPath(title:string,route: Route,detailNumber:number,startDate:Moment) {
        startDate = startDate.set('hours',8);
        let currentDate = moment(startDate);
        let batchStageSet:Array<string> = [];
        for (let stage of route.routeStageSet) {
            let spec = stage.specialization;

            let stageJson = {
                plannedStartDate: moment(currentDate),
                plannedEndDate:moment(currentDate),
                title:stage.name,
                worker:null,
                equipment:null,
                code:stage.code,
                setupDuration:stage.setupDuration
            };
            let min = {
                duration:99999999,
                equipment:null,
                worker:null
            };
            if(spec) {
                for (let worker of spec.workerSet) {
                    let res = this.workerMinTime(stage, spec, worker, currentDate, detailNumber);
                    if (res.duration < min.duration) {
                        min = res;
                    }
                }
                stageJson.plannedEndDate = moment(currentDate.add(min.duration, 'h'));
                stageJson.worker = min.worker.uuid;
                stageJson.equipment = min.equipment.uuid;
                let result = await this.store.createBatchStageOnServer(stageJson);
                let stageInstance = this.store.createBatchStage({...stageJson, uuid: result.data.UUID});
                batchStageSet.push(stageInstance.uuid);
            }
        }
        let plannedBatchEndDate = currentDate;

        let batchJson = {
            plannedStartDate:startDate,
            plannedEndDate:plannedBatchEndDate,
            name:title,
            plannedDuration:plannedBatchEndDate.diff(startDate,'hours'),
            detailsNumber:detailNumber,
            batchStageSet:batchStageSet
        };
        let result = await this.store.createBatchOnServer(batchJson);
        return this.store.createBatch({...batchJson,uuid:result.data.UUID});
    }

    workerMinTime(stage: RouteStageModel, spec: SpecializationModel, worker: WorkerModel, startDate: Moment, detailNumber: number): {worker:WorkerModel,equipment:EquipmentModel,duration:number} {
        let min = 99999999999;

        let result = {
            duration:min,
            equipment:null,
            worker:worker
        };
        if(isNullOrUndefined(spec)){
            console.log('null');
        }

        for(let equip of spec.equipmentSet){
            let currentDate = moment(startDate);
            let durationInHrs = stage.duration * detailNumber + stage.setupDuration;
            let stageDurationInDays = Math.ceil(durationInHrs / 8);//stage duration in 8hr days
            let realHours = 0;

            while (realHours < durationInHrs) {
                if (currentDate.isoWeekday() < 6 && currentDate.hour()==8) {
                    if (equip.isWorkingAtDate(currentDate)) {
                        if (worker.isWorkingAtDate(currentDate)) {
                            if (durationInHrs - realHours > 8) {
                                currentDate = currentDate.add(8, 'h');
                                realHours += 8;
                            }
                            else {
                                let diff = durationInHrs-realHours;
                                currentDate = currentDate.add(diff,'h');
                                realHours = durationInHrs;
                                break;
                            }
                        } else {
                            stageDurationInDays++;
                        }
                    } else {
                        stageDurationInDays++;
                    }
                }
                currentDate = currentDate.add(1, 'd').set('hour',8);
                console.log(currentDate.format("HH"));
            }
            if(currentDate.diff(startDate,'hours')<min){
                min = currentDate.diff(startDate,'hours');
                result = {
                    duration:min,
                    worker:worker,equipment:equip
                }
            }
        }

        return result;
    }
}