import {observable} from "mobx";
import {AbstractViewProperty} from "./ViewProperties/AbstractViewProperty";
import {BatchCode} from "./ViewProperties/BatchCode";

export class TaskTableViewMode {
    @observable viewProperties:Array<AbstractViewProperty> = [];
    constructor(){
        this.viewProperties.push(new BatchCode());
        this.viewProperties.push(new BatchCode());
    }
}

export default TaskTableViewMode;