import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {observable, computed} from "mobx";
import {RouteStageModel} from "./RouteStageModel";
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
        this.autoUpdate = true;

    }

    @computed get routeStageSet(): Array<RouteStageModel> {
        let stages: Array<RouteStageModel> = [];
        for (let stage of this.routeStageSetLinks) {
            let stageInstance = this.store.cyberObjectsStore.get(stage);
            if (stageInstance instanceof RouteStageModel)
                stages.push(stageInstance)
        }
        stages = stages.sort((a,b)=>{
            if(parseInt(a.code)>parseInt(b.code))
                return 1;
            if(parseInt(a.code)<parseInt(b.code))
                return -1;
            return 0;
        });
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
