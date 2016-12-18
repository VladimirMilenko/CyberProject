/// <reference path="../../typings/globals/axios/index.d.ts" />

import AxiosXHR = Axios.AxiosXHR;
import IPromise = Axios.IPromise;
export abstract class AbstractTransportLayer{

    objectCreatedHandler:any;
    objectUpdatedHandler:any;

    constructor(objectCreatedHandler,objectUpdatedHandler){
        this.objectCreatedHandler = objectCreatedHandler;
        this.objectUpdatedHandler = objectUpdatedHandler;
    }
    abstract fetchWorkers():IPromise<AxiosXHR<any>>;
}