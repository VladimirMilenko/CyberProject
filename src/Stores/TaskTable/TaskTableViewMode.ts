import {observable} from "mobx";
import {BatchViewProperty} from "./ViewProperties/BatchProps/BatchViewProperty";
import {BatchTitleVP} from "./ViewProperties/BatchProps/BatchTitleVP";
import {BatchPlannedStartDateVP} from "./ViewProperties/BatchProps/BatchPlannedStartDateVP";
import {StageViewProperty} from "./ViewProperties/StageProps/StageViewProperty";
import {StageTitle} from "./ViewProperties/StageProps/StageTitle";
import {BatchDelimiter} from "./ViewProperties/BatchProps/BatchDelimiter";

export class TaskTableViewMode {
    @observable batchDelimiter:BatchDelimiter;
    @observable stageViewProperties:Array<StageViewProperty> = [];
    @observable batchViewProperties:Array<BatchViewProperty> = [];
    constructor(){
        this.batchDelimiter = new BatchDelimiter((val)=>{
            this.updateViewProperties(val);
        });
        this.batchViewProperties.push(new BatchTitleVP());
        this.batchViewProperties.push(new BatchPlannedStartDateVP());
        this.stageViewProperties.push(new StageTitle());
    }
    updateViewProperties(collapsed:boolean){
        for(let batchView of this.batchViewProperties.filter(vp=>!vp.requried)){
            batchView.enabled = !collapsed;
        }
    }
}

export default TaskTableViewMode;