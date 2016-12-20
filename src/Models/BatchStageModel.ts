import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {observable, computed} from "mobx";
import moment from 'moment';
import {isUndefined} from "util";
import Moment = moment.Moment;
import {GantModel, Selectable} from "../Components/GantTask";



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

    fromJson(object: any) {
        super.fromJson(object);
        if (!isUndefined(object.title))
            this.title = object.title;
        if (!isUndefined(object.plannedEndDate))
            this.plannedEndDate = moment(object.plannedEndDate);
        if (!isUndefined(object.plannedStartDate))
            this.plannedStartDate = moment(object.plannedStartDate);
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
        return Math.abs(Math.abs(hours) * ((this.store.viewSettings.cellWidth + 2)/24));
    }
    @computed get offsetX(){
        let hours = Math.ceil(this.plannedStartDate.diff(this.store.viewSettings.tableStart, 'hours'));
        return Math.abs(Math.abs(hours) * ((this.store.viewSettings.cellWidth + 2) / 24));

    }
    @computed get toJson() {
        let {uuid, plannedStartDate, plannedEndDate, title} = this;
        return {
            uuid, plannedStartDate, plannedEndDate, title
        }
    }

}