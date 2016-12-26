import {observable} from "mobx";
import {BatchViewProperty} from "./ViewProperties/BatchProps/BatchViewProperty";
import {BatchTitleVP} from "./ViewProperties/BatchProps/BatchTitleVP";
import {BatchPlannedStartDateVP} from "./ViewProperties/BatchProps/BatchPlannedStartDateVP";
import {StageViewProperty} from "./ViewProperties/StageProps/StageViewProperty";
import {StageTitle} from "./ViewProperties/StageProps/StageTitle";
import {BatchDelimiter} from "./ViewProperties/BatchProps/BatchDelimiter";
import {BatchDetailCodeVP} from "./ViewProperties/BatchProps/BatchDetailCodeVP";
import {BatchStatusVP} from "./ViewProperties/BatchProps/BatchStatusVP";
import {BatchDetailNumberVP} from "./ViewProperties/BatchProps/BatchDetailNumberVP";
import {BatchPlannedEndDateVP} from "./ViewProperties/BatchProps/BatchPlannedEndDateVP";
import {CyberObjectsStore} from "../CyberObjectsStore/CyberObjectsStore";
import {StageSite} from "./ViewProperties/StageProps/StageSite";
import {StagePlannedStartDate} from "./ViewProperties/StageProps/StagePlannedStartDate";
import {StagePlannedEndDate} from "./ViewProperties/StageProps/StagePlannedEndDate";
import {StagePlannedDuration} from "./ViewProperties/StageProps/StagePlannedDuration";
import {StageExecutor} from "./ViewProperties/StageProps/StageExecutor";
import {StageEquipment} from "./ViewProperties/StageProps/StageEquipment";

export class TaskTableViewMode {
    @observable batchDelimiter:BatchDelimiter;
    @observable stageViewProperties:Array<StageViewProperty> = [];
    @observable batchViewProperties:Array<BatchViewProperty> = [];
    private store: CyberObjectsStore;
    constructor(store:CyberObjectsStore){
        this.store = store;
        this.batchDelimiter = new BatchDelimiter((val)=>{
            this.updateViewProperties(val);
        });
        this.batchViewProperties.push(new BatchStatusVP());
        this.batchViewProperties.push(new BatchTitleVP());
        this.batchViewProperties.push(new BatchDetailCodeVP);
        this.batchViewProperties.push(new BatchDetailNumberVP());
        this.batchViewProperties.push(new BatchPlannedStartDateVP(store));
        this.batchViewProperties.push(new BatchPlannedEndDateVP(store));

        this.stageViewProperties.push(new StageTitle());
        this.stageViewProperties.push(new StageSite());
        this.stageViewProperties.push(new StageEquipment());
        this.stageViewProperties.push(new StagePlannedStartDate());
        this.stageViewProperties.push(new StagePlannedEndDate());
        this.stageViewProperties.push(new StagePlannedDuration());
        this.stageViewProperties.push(new StageExecutor(this.store));
    }
    updateViewProperties(collapsed:boolean){
        for(let batchView of this.batchViewProperties.filter(vp=>!vp.required)){
            batchView.enabled = !collapsed;
        }
    }
}

export default TaskTableViewMode;