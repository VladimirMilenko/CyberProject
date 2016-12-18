import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {observable, computed} from "mobx";
import {StageModel} from "./StageModel";
import {isUndefined} from "util";
export class Route extends CyberObjectInstance {
    @observable name: string;
    @observable code: string;
    @observable duration: number;
    @observable routeStageSetLinks: Array<string> = [];

    fromJson(object: any) {
        super.fromJson(object);
        if (!isUndefined(object.name))
            this.name = object.name;
        if (!isUndefined(object.code))
            this.code = object.code;
        if (!isUndefined(object.duration))
            this.duration = object.duration;
        if (object.routeStageSet) {
            for (let stage of object.routeStageSet) {
                if (stage instanceof Object) {
                    let stageInstance = this.store.createStage(stage);
                    this.routeStageSetLinks.push(stageInstance.uuid);
                } else {
                    this.routeStageSetLinks.push(stage);
                }
            }
        }
    }

    @computed get routeStageSet(): Array<StageModel> {
        let stages: Array<StageModel> = [];
        for (let stage of this.routeStageSetLinks) {
            let stageInstance = this.store.cyberObjectsStore.get(stage);
            if (stageInstance instanceof StageModel)
                stages.push(stageInstance)
        }
        return stages;
    }

    @computed get toJson() {
        return {
            uuid: this.uuid,
            name: this.name,
            code: this.code,
            duration: this.duration
        }
    }
}
