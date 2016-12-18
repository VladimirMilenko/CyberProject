import {CyberObjectInstance} from "../../Models/BasicTypes/CyberObjectInstance";
import {Predicate, and} from "./CyberObjectsStore";
export class Store<T extends CyberObjectInstance> {
    objects: Array<T> = [];

    addObject(object: T): void {
        this.objects.push(object);
    }

    deleteObject(object: T): void {
        let index = this.findIndexByUUID(object.uuid);
        if (index > -1)
            this.objects.splice(index, 1);
    }

    find(conditions: Array<Predicate<T>>): T|undefined {
        let worker = this.objects.find(and(conditions));
        if (worker) {
            return worker;
        } else {
            return undefined;
        }
    }

    findByUUID(uuid: string): T|undefined {
        return this.find([(object: T) => object.uuid == uuid]);
    }

    findIndex(conditions: Array<Predicate<T>>): number {
        return this.objects.findIndex(and(conditions));
    }

    findIndexByUUID(uuid: string): number {
        return this.findIndex([(object: T) => object.uuid == uuid]);
    }

    filter(conditions: Array<Predicate<T>>): Array<T> {
        return this.objects.filter(and(conditions));
    }
}