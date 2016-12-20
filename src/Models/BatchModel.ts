import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {CyberObejctType} from "./BasicTypes/CyberObjectTypes";
import {observable, computed} from "mobx";
import moment from 'moment';
import {BatchStageModel} from "./BatchStageModel";
import {isUndefined} from "util";
import Moment = moment.Moment;
import {GantModel, Selectable} from "../Components/GantTask";
import {GantTreeObject} from "../Stores/CyberObjectsStore/CyberObjectsStore";


export class BatchModel extends CyberObjectInstance implements GantModel, Selectable {
    @observable howered: boolean;
    @observable selected: boolean;

    dragged(hours: number): void {
        this.plannedEndDate = moment(this.plannedEndDate.add(hours, 'h'));
        this.plannedStartDate = moment(this.plannedStartDate.add(hours, 'h'));
        for (let stage of this.stageSet) {
            stage.dragged(hours);
        }
        this.updatePosition();
    }

    resized(direction: string, hours: number): void {
        switch (direction) {
            case 'left':
                this.plannedStartDate = moment(this.plannedStartDate.add(-hours, 'h'));
                break;
            default:
                this.plannedEndDate = moment(this.plannedEndDate.add(hours, 'h'));
                break;
        }
        for (let stage of this.stageSet) {
            stage.resized(direction, hours);
        }
    }

    rndObject: any;
    @observable expanded: boolean = true;
    @observable is_finished: boolean;
    @observable title: string;
    @observable plannedEndDate: Moment;
    @observable plannedStartDate: Moment;
    @observable detailsNumber: number;
    @observable status: string;
    @observable code: string;
    @observable name: string;
    @observable batchStageLink: string;


    @observable stageSetLinks: Array<string> = [];

    fromJson(object: any) {
        super.fromJson(object);
        if (!isUndefined(object.title))
            this.title = object.title;
        if (!isUndefined(object.plannedEndDate))
            this.plannedEndDate = moment(object.plannedEndDate);
        if (!isUndefined(object.plannedStartDate))
            this.plannedStartDate = moment(object.plannedStartDate);
        if (!isUndefined(object.stageSet)) {
            if (object.stageSet.length > 0) {
                for (let stageObject of object.stageSet) {
                    if (stageObject instanceof Object) {
                        let instance = this.store.createBatchStage(stageObject);
                        this.stageSetLinks.push(instance.uuid);
                    } else {
                        this.stageSetLinks.push(stageObject);
                    }
                }
            }
        }
        if (!isUndefined(object.batchStage)) {
            if (object.batchStage instanceof Object) {
                let instance = this.store.createBatch(object.batchStage);
                this.batchStageLink = instance.uuid;
            } else {
                this.batchStageLink = object.batchStage;
            }
        }
        if (!isUndefined(object.code))
            this.code = object.code;
        if (!isUndefined(object.name))
            this.title = object.name;
        if (!isUndefined(object.status))
            this.status = object.status;
    }

    updatePosition() {
        if (this.rndObject && this.rndObject.updatePosition) {
            this.rndObject.updatePosition({x: this.offsetX, y: 0});
        }
    }

    @computed get buildTreeObject(): GantTreeObject {
        let children = [];
        for (let stage of this.stageSet) {
            children.push(stage.buildTreeObject);
        }
        return {
            content: this,
            expanded: this.expanded,
            children
        }
    }

    @computed get batchStage(): BatchModel {
        let instance = this.store.cyberObjectsStore.get(this.batchStageLink);
        if(instance instanceof  BatchModel)
            return instance;
        return undefined;
    }

    @computed get stageSet(): Array<BatchStageModel> {
        let stages: Array<BatchStageModel> = [];
        for (let stageLink of this.stageSetLinks) {
            let instance = this.store.cyberObjectsStore.get(stageLink);
            if (instance instanceof BatchStageModel)
                stages.push(instance);
        }
        return stages;
    }

    @computed get formattedEndDate() {
        return this.plannedEndDate.format("DD.MM.YYYY");
    }

    @computed get formattedStartDate() {
        return this.plannedStartDate.format("DD.MM.YYYY");
    }

    @computed get widthInPx() {
        let hours = this.plannedEndDate.diff(this.plannedStartDate, 'hours');
        return Math.abs(Math.abs(hours) * ((this.store.viewSettings.cellWidth + 2) / 24));
    }

    @computed get offsetX() {
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