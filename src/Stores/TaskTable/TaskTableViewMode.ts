import {observable} from "mobx";
import {AbstractViewProperty} from "./ViewProperties/AbstractViewProperty";
import {BatchViewProperty} from "./ViewProperties/BatchProps/BatchViewProperty";
import {BatchTitleVP} from "./ViewProperties/BatchProps/BatchTitleVP";
import {BatchPlannedStartDateVP} from "./ViewProperties/BatchProps/BatchPlannedStartDateVP";
import {StageViewProperty} from "./ViewProperties/StageProps/StageViewProperty";
import {StageTitle} from "./ViewProperties/StageProps/StageTitle";

export class TaskTableViewMode {
    @observable stageViewProperties:Array<StageViewProperty> = [];
    @observable batchViewProperties:Array<BatchViewProperty> = [];
    constructor(){
        this.batchViewProperties.push(new BatchTitleVP());
        this.batchViewProperties.push(new BatchPlannedStartDateVP());
        this.stageViewProperties.push(new StageTitle());
    }
}

export default TaskTableViewMode;