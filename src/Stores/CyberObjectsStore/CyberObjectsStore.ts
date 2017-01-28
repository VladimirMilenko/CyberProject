import {CyberObjectInstance} from "../../Models/BasicTypes/CyberObjectInstance";
import {reaction, computed, observable} from "mobx";
import {AbstractTransportLayer} from "../../TransportLayers/AbstractTransportLayer";
import {WorkerModel} from "../../Models/WorkerModel";
import {Route} from "../../Models/RouteModel";
import {RouteStageModel} from "../../Models/RouteStageModel";
import {Store} from "./Store";
import {SpecializationModel} from "../../Models/SpecializationModel";
import {AbstractObjectsStore} from "./AbstractObjectsStore";
import {EquipmentModel} from "../../Models/EquipmentModel";
import {BatchModel} from "../../Models/BatchModel";
import {BatchStageModel} from "../../Models/BatchStageModel";
import {ViewSettings} from "../ViewSettingsStore/ViewSettings";
import AxiosXHR = Axios.AxiosXHR;
import IPromise = Axios.IPromise;
import {SiteModel} from "../../Models/SiteModel";
import {SimpleCriticalPath} from "../../CriticalPathConstruction/SimpleCriticalPath";

export class CyberObjectsStore {
    observers = {};

    @observable orderedBy:string;
    @observable orderState:number = 1;
    cyberObjectsStore: AbstractObjectsStore = new AbstractObjectsStore();

    routes: Store<Route>;
    workers: Store<WorkerModel>;
    specializations: Store<SpecializationModel>;
    equipments: Store<EquipmentModel>;
    routeStages: Store<RouteStageModel>;
    sites:Store<SiteModel>;

    batches: Store<BatchModel>;
    batchStages: Store<BatchStageModel>;


    viewSettings: ViewSettings;
    transportLayer: AbstractTransportLayer;
    pathConstructionAlgorithm:SimpleCriticalPath;

    constructor() {
        this.routes = new Store<Route>();
        this.workers = new Store<WorkerModel>();
        this.specializations = new Store<SpecializationModel>();
        this.routeStages = new Store <RouteStageModel>();
        this.equipments = new Store<EquipmentModel>();
        this.batches = new Store<BatchModel>();
        this.batchStages = new Store<BatchStageModel>();
        this.sites = new Store<SiteModel>();
        this.pathConstructionAlgorithm = new SimpleCriticalPath(this);
    }

    setViewSettings(vs: ViewSettings) {
        this.viewSettings = vs;
    }
    orderBy(property){
        if(this.orderedBy == property)
            this.orderState = -this.orderState;
        this.orderedBy = property;
        this.batches.objects = this.batches.objects.sort((a,b)=>{
           if(a[property]>b[property])
               return this.orderState;
           if(a[property]<b[property])
               return -1*this.orderState;
           return 0;
        });
    }
    createBatch(jsonObject: any): BatchModel {
        let possibleInstance = this.cyberObjectsStore.get(jsonObject.uuid);
        if (possibleInstance instanceof BatchModel) {
            return possibleInstance;
        }
        let batchModel = new BatchModel(this);
        batchModel.fromJson(jsonObject);
        this.batches.addObject(batchModel);
        this.cyberObjectsStore.add(batchModel);
        this.addListenerToCyberObject(batchModel);
        return batchModel;
    }

    createBatchStage(jsonObject: any): BatchStageModel {
        let possibleInstance = this.cyberObjectsStore.get(jsonObject.uuid);
        if (possibleInstance instanceof BatchStageModel) {
            return possibleInstance;
        }
        let batchStageModel = new BatchStageModel(this);
        batchStageModel.fromJson(jsonObject);
        this.batchStages.addObject(batchStageModel);
        this.cyberObjectsStore.add(batchStageModel);
        this.addListenerToCyberObject(batchStageModel);
        return batchStageModel;
    }

    async createBatchStageOnServer(jsonObject: any) {
        return this.transportLayer.createObject('batchStage', jsonObject);
    }

    async createBatchOnServer(jsonObject: any) {
        return this.transportLayer.createObject('batch', jsonObject);
    }

    createWorker(jsonObject: any): WorkerModel {
        let possibleInstance = this.cyberObjectsStore.get(jsonObject.uuid);
        if (possibleInstance instanceof WorkerModel) {
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
        if (possibleInstance instanceof EquipmentModel) {
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
        if (possibleInstance instanceof Route) {
            return possibleInstance;
        }
        let route = new Route(this);
        route.fromJson(jsonObject);
        this.cyberObjectsStore.add(route);
        this.routes.addObject(route);
        this.addListenerToCyberObject(route);
        return route;
    }

    createStage(jsonObject: any): RouteStageModel {
        let possibleInstance = this.cyberObjectsStore.get(jsonObject.uuid);
        if (possibleInstance instanceof RouteStageModel) {
            return possibleInstance;
        }
        let stage = new RouteStageModel(this);
        stage.fromJson(jsonObject);
        this.cyberObjectsStore.add(stage);
        this.routeStages.addObject(stage);
        this.addListenerToCyberObject(stage);
        return stage;
    }

    createSpecialization(jsonObject: any): SpecializationModel {
        let possibleInstance = this.cyberObjectsStore.get(jsonObject.uuid);
        if (possibleInstance instanceof SpecializationModel) {
            return possibleInstance;
        }

        let specialization = new SpecializationModel(this);
        specialization.fromJson(jsonObject);
        this.cyberObjectsStore.add(specialization);
        this.specializations.addObject(specialization);
        this.addListenerToCyberObject(specialization);
        return specialization;
    }
    createSite(jsonObject:any):SiteModel{
        let possibleInstance = this.cyberObjectsStore.get(jsonObject.uuid);
        if(possibleInstance instanceof SiteModel)
            return possibleInstance;
        let site = new SiteModel(this);
        site.fromJson(jsonObject);
        this.cyberObjectsStore.add(site);
        this.sites.addObject(site);
        this.addListenerToCyberObject(site);
        return site;
    }
    addListenerToCyberObject(cyberObjectInstance: CyberObjectInstance) {
        this.observers[cyberObjectInstance.uuid] = reaction(
            "objectChangedReaction",
            () => cyberObjectInstance.toJson,
            serializedObject => {
                if(cyberObjectInstance.autoUpdate)
                    this.transportLayer.updateObject(serializedObject);
            }
        );
    }

    @computed get gantTree(): Array<GantTreeObject> {
        let tree: Array<GantTreeObject> = [];
        for (let batch of this.batches.objects) {
            tree.push(batch.buildTreeObject);
        }
        return tree;
    }
    removeBatch(cyberObjectInstance:BatchModel,removeOnServer = true){
        this.removeListenerFromCyberObject(cyberObjectInstance);
        for(let stage of cyberObjectInstance.batchStageSet){
            this.removeListenerFromCyberObject(stage);
        }
        if(removeOnServer) {
            for (let stage of cyberObjectInstance.batchStageSet) {
                this.transportLayer.deleteObject(stage);
            }
            this.transportLayer.deleteObject(cyberObjectInstance);
        }
        this.batches.deleteObject(cyberObjectInstance);
    }
    removeListenerFromCyberObject(cyberObjectInstance: CyberObjectInstance) {
        delete this.observers[cyberObjectInstance.uuid];
    }
}
export function and(predicates: Predicate<any>[]): Predicate<any> {
    return (e) => predicates.every(p => p(e));
}
export type Predicate<T> = (item: T) => boolean;

export class GantTreeObject {
    content: BatchModel|BatchStageModel;
    children: Array<GantTreeObject>;
    expanded: boolean;

    constructor(object: BatchModel|BatchStageModel) {
        if (object instanceof BatchModel) {
            this.content = object;
            this.children = [];
            for (let stage of object.stageSet) {
                this.children.push(
                    new GantTreeObject(stage)
                )
            }
        }
        if (object instanceof BatchStageModel) {
            this.content = object;
            this.children = [];
        }
    }
}