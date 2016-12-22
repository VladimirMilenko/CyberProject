import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {observable, computed} from "mobx";
import moment from 'moment';
import {isUndefined} from "util";
import Moment = moment.Moment;
import {GantModel, Selectable} from "../Components/GantTask";
import {isNullOrUndefined} from "util";
import {WorkerModel} from "./WorkerModel";
import {EquipmentModel} from "./EquipmentModel";



export class BatchStageModel extends CyberObjectInstance implements GantModel, Selectable{
    @observable howered: boolean;
    @observable selected: boolean;
    rndObject: any;

    dragged(hours: number): void {
        this.plannedEndDate = moment(this.plannedEndDate.add(hours,'h'));
        this.plannedStartDate = moment(this.plannedStartDate.add(hours,'h'));
        this.updatePosition();
    }

    resized(direction:string,hours: number): void {
        switch (direction){
            case 'left':
                this.plannedStartDate = moment(this.plannedStartDate.add(-hours,'h'));
                break;
            default:
                this.plannedEndDate = moment(this.plannedEndDate.add(hours,'h'));
                break;
        }
    }
    @observable expanded:boolean = true;

    @observable is_finished: boolean;
    @observable title: string;
    @observable plannedEndDate: Moment;
    @observable plannedStartDate: Moment;
    @observable code:string;

    @observable workerLink:string;
    @observable equipmentLink:string;

    fromJson(object: any) {
        super.fromJson(object);
        if (!isUndefined(object.title))
            this.title = object.title;
        if (!isUndefined(object.plannedEndDate))
            this.plannedEndDate = moment(object.plannedEndDate);
        if (!isUndefined(object.plannedStartDate))
            this.plannedStartDate = moment(object.plannedStartDate);
        if(!isNullOrUndefined(object.worker)){
            if(object.worker instanceof Object){
                let worker = this.store.createWorker(object.worker);
                this.workerLink = worker.uuid;
            } else{
                this.workerLink = object.worker;
            }
        }
        if(!isNullOrUndefined(object.equipment)){
            if(object.equipment instanceof Object){
                let equipment = this.store.createEquipment(object.equipment);
                this.equipmentLink = equipment.uuid;
            } else{
                this.equipmentLink = object.equipment;
            }
        }
        if(!isNullOrUndefined(object.code))
            this.code = object.code;
        this.updatePosition();
        this.autoUpdate = true;

    }

    @computed get worker():WorkerModel{
        let instance = this.store.cyberObjectsStore.get(this.workerLink);
        if(instance instanceof WorkerModel)
            return instance;
    }

    @computed get equipment():EquipmentModel{
        let instance = this.store.cyberObjectsStore.get(this.equipmentLink);
        if(instance instanceof EquipmentModel)
            return instance;
    }

    @computed get buildTreeObject(){
        let children = [];
        return{
            content:this,
            expanded:this.expanded,
            children
        }
    }
    updatePosition(){
        if(this.rndObject && this.rndObject.updatePosition){
            this.rndObject.updatePosition({x: this.offsetX, y: 0});
        }
    }
    @computed get formattedEndDate(){
        return this.plannedEndDate.format("DD.MM.YYYY");
    }

    @computed get formattedStartDate(){
        return this.plannedStartDate.format("DD.MM.YYYY");
    }
    @computed get widthInPx() {
        let hours = this.plannedEndDate.diff(this.plannedStartDate, 'hours');
        return Math.abs(Math.abs(hours) * ((this.store.viewSettings.cellWidth+2)/24));
    }
    @computed get offsetX(){
        let hours = Math.ceil(this.plannedStartDate.diff(this.store.viewSettings.tableStart, 'hours'));
        return Math.abs(Math.abs(hours) * ((this.store.viewSettings.cellWidth+2) / 24));

    }
    @computed get toJson() {
        let result:any = {};
        if(this.uuid)
            result = {...result,uuid:this.uuid};
        if(this.plannedStartDate)
            result = {...result,plannedStartDate:this.plannedStartDate};
        if(this.title)
            result = {...result,title:this.title};
        if(this.plannedEndDate)
            result = {...result,plannedEndDate:this.plannedEndDate};
        if(this.workerLink)
            result = {...result,worker:this.workerLink};
        if(this.equipmentLink)
            result = {...result,equipment:this.equipmentLink};
        return result;
    }

}