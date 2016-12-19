import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {observable} from "mobx";
import {isUndefined} from "util";
import {isNullOrUndefined} from "util";
export class SiteModel extends CyberObjectInstance {
    @observable name: string;
    @observable workerSetLinks: Array<string>;

    fromJson(object: any) {
        super.fromJson(object);
        if (!isNullOrUndefined(object.name))
            this.name = object.name;
        if (!isNullOrUndefined(object.workerSet)) {
            for (let worker of object.workerSet) {
                if (worker instanceof Object) {
                    let workerInstance = this.store.createWorker(worker);
                    this.workerSetLinks.push(workerInstance.uuid);
                } else {
                    this.workerSetLinks.push(worker);
                }
            }
        }
    }
}