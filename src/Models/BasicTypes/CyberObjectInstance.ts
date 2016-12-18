import {CyberObejctType} from "./CyberObjectTypes";
import {computed, action} from "mobx";
import {CyberObjectsStore} from "../../Stores/CyberObjectsStore/CyberObjectsStore";

export class CyberObjectInstance {
    uuid: string;
    store: CyberObjectsStore;

    constructor(store: CyberObjectsStore) {
        this.store = store;
    }

    public fromJson(object: any) {
        if (object.uuid) {
            this.uuid = object.uuid;
        }
    }

    @computed
    public get toJson(): any {
        return (
            {uuid: this.uuid}
        )
    }
}