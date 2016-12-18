import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {observable, computed} from "mobx";
export class EquipmentModel extends CyberObjectInstance {
    @observable name;
    @observable code;
    @observable status;

    fromJson(object: any) {
        super.fromJson(object);
        if (object.name != undefined)
            this.name = object.name;
        if (object.code != undefined)
            this.code = object.code;
        if (object.status != undefined)
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