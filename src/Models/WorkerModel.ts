import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {observable, computed} from "mobx";
import {inject} from "mobx-react/custom";
import {SpecializationModel} from "./SpecializationModel";
import {isUndefined} from "util";

export class WorkerModel extends CyberObjectInstance {
    @observable name: string;
    @observable status: string;

    @observable specializationLink;

    fromJson(object: any) {
        super.fromJson(object);
        if (!isUndefined(object.name))
            this.name = object.name;
        if (!isUndefined(object.status))
            this.status = object.status;
        if(object.specialization && !(object.specialization instanceof Object)){
            this.specializationLink = object.specialization;
        }
    }

    get specialization(): SpecializationModel | undefined {
        let instance = this.store.cyberObjectsStore.get(this.specializationLink);
        if(instance instanceof SpecializationModel){
            return instance;
        }
        return undefined;
    }

    @computed get toJson() {
        return {
            uuid: this.uuid,
            name: this.name,
            status: this.status
        }
    }
}
