import {CyberObjectInstance} from "../../Models/BasicTypes/CyberObjectInstance";
export class AbstractObjectsStore {
    objectsMap: any = {};

    add(object: CyberObjectInstance): CyberObjectInstance {
        this.objectsMap[object.uuid] = object;
        return object;
    }

    get(uuid): CyberObjectInstance | undefined {
        if (this.objectsMap[uuid])
            return this.objectsMap[uuid];
        return undefined;
    }

    remove(uuid): CyberObjectInstance | undefined {
        if (this.objectsMap[uuid]) {
            let object = this.objectsMap[uuid];
            delete this.objectsMap[uuid];
            return object;
        }
        return undefined;
    }
}