import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {observable, computed} from "mobx";
import {WorkerModel} from "./WorkerModel";
import {EquipmentModel} from "./EquipmentModel";
import {isUndefined} from 'util';
export class SpecializationModel extends CyberObjectInstance {
    @observable name;
    @observable workersLinks: Array<string> = [];
    @observable equipmentSetLinks: Array<string> = [];

    fromJson(object: any) {
        super.fromJson(object);
        if (!isUndefined(object.name))
            this.name = object.name;
        if (!isUndefined(object.workerSet)) {
            for (let worker of object.workerSet) {
                if (worker instanceof Object) {
                    let workerInstance = this.store.createWorker(worker);
                    this.workersLinks.push(workerInstance.uuid);
                } else
                    this.workersLinks.push(worker);
            }
        }
        if (!isUndefined(object.equipmentSet)) {
            for (let equipment of object.equipmentSet) {
                if (equipment instanceof Object) {
                    this.store.createEquipment(equipment);
                    this.equipmentSetLinks.push(equipment.uuid);
                } else
                    this.equipmentSetLinks.push(equipment);
            }
        }
        this.autoUpdate = true;

    }

    @computed get workerSet(): Array<WorkerModel> {
        let workers: Array<WorkerModel> = [];
        for (let worker of this.workersLinks) {
            let workerInstance = this.store.cyberObjectsStore.get(worker);
            if (workerInstance instanceof WorkerModel)
                workers.push(workerInstance)
        }
        return workers;
    }

    @computed get equipmentSet(): Array<EquipmentModel> {
        let equipments: Array<EquipmentModel> = [];
        for (let equipment of this.equipmentSetLinks) {
            let equipmentInstance = this.store.cyberObjectsStore.get(equipment);
            if (equipmentInstance instanceof EquipmentModel)
                equipments.push(equipmentInstance);
        }
        return equipments;
    }
}