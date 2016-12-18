import {CyberObjectInstance} from "../../Models/BasicTypes/CyberObjectInstance";
import {reaction} from "mobx";
import {AbstractTransportLayer} from "../../TransportLayers/AbstractTransportLayer";
import {WorkerModel} from "../../Models/WorkerModel";
import {Route} from "../../Models/RouteModel";
import {StageModel} from "../../Models/StageModel";
import {Store} from "./Store";
import {SpecializationModel} from "../../Models/SpecializationModel";
import {AbstractObjectsStore} from "./AbstractObjectsStore";
import {EquipmentModel} from "../../Models/EquipmentModel";

export class CyberObjectsStore {
    observers = {};

    cyberObjectsStore: AbstractObjectsStore = new AbstractObjectsStore();

    routes: Store<Route>;
    workers: Store<WorkerModel>;
    specializations: Store<SpecializationModel>;
    equipments: Store<EquipmentModel>;
    stages: Store<StageModel>;

    transportLayer: AbstractTransportLayer;

    constructor() {
        this.routes = new Store<Route>();
        this.workers = new Store<WorkerModel>();
        this.specializations = new Store<SpecializationModel>();
        this.stages = new Store <StageModel>();
        this.equipments = new Store<EquipmentModel>();
    }


    createWorker(jsonObject: any): WorkerModel {
        let possibleInstance = this.cyberObjectsStore.get(jsonObject.uuid);
        if(possibleInstance instanceof WorkerModel){
            return possibleInstance;
        }
        let worker = new WorkerModel(this);
        worker.fromJson(jsonObject);
        this.workers.addObject(worker);
        this.cyberObjectsStore.add(worker);
        this.addListenerToCyberObject(worker);
        return worker;
    }

    createEquipment(jsonObject: any): EquipmentModel {
        let possibleInstance = this.cyberObjectsStore.get(jsonObject.uuid);
        if(possibleInstance instanceof EquipmentModel){
            return possibleInstance;
        }
        let equipment = new EquipmentModel(this);
        equipment.fromJson(jsonObject);
        this.equipments.addObject(equipment);
        this.cyberObjectsStore.add(equipment);
        this.addListenerToCyberObject(equipment);
        return equipment;
    }

    createRoute(jsonObject: any): Route {
        let possibleInstance = this.cyberObjectsStore.get(jsonObject.uuid);
        if(possibleInstance instanceof Route){
            return possibleInstance;
        }
        let route = new Route(this);
        route.fromJson(jsonObject);
        this.cyberObjectsStore.add(route);
        this.routes.addObject(route);
        this.addListenerToCyberObject(route);
        return route;
    }

    createStage(jsonObject: any): StageModel {
        let possibleInstance = this.cyberObjectsStore.get(jsonObject.uuid);
        if(possibleInstance instanceof StageModel){
            return possibleInstance;
        }
        let stage = new StageModel(this);
        stage.fromJson(jsonObject);
        this.cyberObjectsStore.add(stage);
        this.stages.addObject(stage);
        this.addListenerToCyberObject(stage);
        return stage;
    }

    createSpecialization(jsonObject: any): SpecializationModel {
        let possibleInstance = this.cyberObjectsStore.get(jsonObject.uuid);
        if(possibleInstance instanceof SpecializationModel){
            return possibleInstance;
        }

        let specialization = new SpecializationModel(this);
        specialization.fromJson(jsonObject);
        this.cyberObjectsStore.add(specialization);
        this.specializations.addObject(specialization);
        this.addListenerToCyberObject(specialization);
        return specialization;
    }

    addListenerToCyberObject(cyberObjectInstance: CyberObjectInstance) {
        this.observers[cyberObjectInstance.uuid] = reaction(
            "objectChangedReaction",
            () => cyberObjectInstance.toJson,
            serializedObject => {
                console.log('CyberObject changed');
                console.log(serializedObject);
            }
        );
    }

    removeListenerFromCyberObject(cyberObjectInstance: CyberObjectInstance) {
        delete this.observers[cyberObjectInstance.uuid];
    }
}
export function and(predicates: Predicate<any>[]): Predicate<any> {
    return (e) => predicates.every(p => p(e));
}
export type Predicate<T> = (item: T) => boolean;