import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {observable, computed} from "mobx";
import {SpecializationModel} from "./SpecializationModel";
import {isUndefined} from "util";
import {GantModel} from "../Components/GantTask";

export class RouteStageModel extends CyberObjectInstance{
    @observable code: string;
    @observable name: string;
    @observable setupDuration: number;
    @observable duration: number;
    @observable specializationLink: string;

    @computed get toJson() {
        return {
            uuid: this.uuid,
            name: this.name,
            code: this.code,
            setupDuration: this.setupDuration,
            duration: this.duration
        }
    }

    @computed get specialization(): SpecializationModel {
        let specializationInstance = this.store.cyberObjectsStore.get(this.specializationLink);
        if (specializationInstance instanceof SpecializationModel)
            return specializationInstance;
        return undefined;
    }

    @computed get buildTreeObject() {
        return {
            content: this,
            children: []
        }
    }

    fromJson(object: any) {
        super.fromJson(object);
        if (!isUndefined(object.code))
            this.code = object.code;
        if (!isUndefined(object.name))
            this.name = object.name;
        if (!isUndefined(object.setupDuration))
            this.setupDuration = object.setupDuration;
        if (!isUndefined(object.duration))
            this.duration = object.duration;
        if (!isUndefined(object.specialization)) {
            let specialization = object.specialization;
            if (specialization instanceof Object) {
                let specializationInstance = this.store.createSpecialization(specialization);
                this.specializationLink = specializationInstance.uuid;
            } else {
                this.specializationLink = specialization;
            }
        }
        this.autoUpdate = true;

    }
}