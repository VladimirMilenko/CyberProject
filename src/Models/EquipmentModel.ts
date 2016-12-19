import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {observable, computed} from "mobx";
import {isUndefined} from "util";
export class EquipmentModel extends CyberObjectInstance {
    @observable name;
    @observable code;
    @observable status;

    fromJson(object: any) {
        super.fromJson(object);
        if (!isUndefined(object.name))
            this.name = object.name;
        if (!isUndefined(object.code != undefined))
            this.code = object.code;
        if (!isUndefined(object.status != undefined))
            this.status = object.status;

    }

    @computed get toJson() {
        return {
            uuid: this.uuid,
            name: this.name,
            code: this.code,
            status: this.status
        }
    }
}