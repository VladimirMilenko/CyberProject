import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {CyberObejctType} from "./BasicTypes/CyberObjectTypes";
import {observable, computed} from "mobx";
import moment from 'moment';
import {StageModel} from "./StageModel";
import {isUndefined} from "util";
import Moment = moment.Moment;



export class BatchModel extends CyberObjectInstance {

    @observable expanded:boolean = true;

    @observable is_finished: boolean;
    @observable title: string;
    @observable plannedEndDate: Moment;
    @observable plannedStartDate: Moment;

    @observable stageSet: Array<StageModel>;

    fromJson(object: any) {
        super.fromJson(object);
        if (!isUndefined(object.title))
            this.title = object.title;
        if (!isUndefined(object.plannedEndDate))
            this.plannedEndDate = object.plannedEndDate;
        if (!isUndefined(object.plannedStartDate))
            this.plannedStartDate = object.plannedStartDate;
        if (!isUndefined(object.stageSet)) {
            if (object.stageSet.length > 0) {
                for (let stageObject of object.stageSet) {
                   // let stageModel = new StageModel(CyberObejctType.Stage);
                   // stageModel.fromJson(stageObject);

//                    this.stageSet.push(stageModel);
                }
            }
        }
    }
    @computed get buildTreeObject(){
        let children = [];
        for(let stage of this.stageSet){
            children.push(stage.buildTreeObject);
        }
        return{
            content:this,
            expanded:this.expanded,
            children
        }
    }

    @computed get toJson() {
        let {uuid, plannedStartDate, plannedEndDate, title} = this;
        return {
            uuid, plannedStartDate, plannedEndDate, title
        }
    }

}