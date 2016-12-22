/// <reference path="../../typings/globals/axios/index.d.ts" />

import AxiosXHR = Axios.AxiosXHR;
import IPromise = Axios.IPromise;
import {CyberObjectsStore} from "../Stores/CyberObjectsStore/CyberObjectsStore";
export abstract class AbstractTransportLayer{

    objectCreatedHandler:any;
    objectUpdatedHandler:any;
    store:CyberObjectsStore;
    constructor(store,objectCreatedHandler,objectUpdatedHandler){
        this.objectCreatedHandler = objectCreatedHandler;
        this.objectUpdatedHandler = objectUpdatedHandler;
        this.store = store;
    }
    abstract fetchWorkers():IPromise<AxiosXHR<any>>;
    abstract createObject(type:string,object:any):IPromise<AxiosXHR<any>>;
    abstract updateObject(object:any):IPromise<AxiosXHR<any>>;
    abstract connectToWS();
}