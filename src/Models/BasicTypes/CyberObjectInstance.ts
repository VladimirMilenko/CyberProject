import {CyberObejctType} from "./CyberObjectTypes";
import {computed, action} from "mobx";
import {CyberObjectsStore} from "../../Stores/CyberObjectsStore/CyberObjectsStore";

export class CyberObjectInstance {
    uuid: string;
    store: CyberObjectsStore;
    autoUpdate:boolean = true;

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
        this.autoUpdate = false;
        return (
            {uuid: this.uuid}
        )
    }
}