import axios from 'axios';
import {AbstractTransportLayer} from "./AbstractTransportLayer";
import IPromise = Axios.IPromise;
import AxiosXHR = Axios.AxiosXHR;
import * as autobahn from "autobahn";
import {Connection} from "autobahn";

export class CyberPlantTransportLayer extends AbstractTransportLayer{
    deleteObject(object: any): Axios.IPromise<Axios.AxiosXHR<any>> {
        if(object instanceof Object)
            return axios.post(
                `${this.apiUrl}cyberobjects/instances/delete/`,
                [object.uuid]
            );
        else{
            return axios.post(
                `${this.apiUrl}cyberobjects/instances/delete/`,
                [object]
            );
        }
    }
    private socketConnection:Connection;
    private objects: Array<any> = [];
    apiUrl:string;
    constructor(store,objectCreatedHandler,objectUpdatedHandler,objectDeleteHandler){
        super(store,objectCreatedHandler,objectUpdatedHandler,objectDeleteHandler);
        //this.connectToWS();
    }
    createObject(type: string, object: any): Axios.IPromise<Axios.AxiosXHR<any>> {
        return axios.post(
            `${this.apiUrl}cyberobjects/instances/create/`,
            [type,object]
        );
    }
    updateObject(object:any){

        return axios.post(
            `${this.apiUrl}cyberobjects/instances/update/`,
            {uuid:object.uuid,...object}
        );
    }
    connectToWS(uri,realm,prefix) {

        this.socketConnection = new autobahn.Connection({
            url: uri,
            realm: realm
        });
        this.socketConnection.open();
        this.socketConnection.onopen = (session) => {
            session.subscribe(prefix+"cyberobjects.instances.updated", (event) => {
                this.objectUpdatedHandler(event[0]);
            });

            session.subscribe(prefix+"cyberobjects.instances.created", (event) => {
                this.objectCreatedHandler(event[0]);
            });
            session.subscribe(prefix+"cyberobjects.instances.deleted",(event)=>{
                this.objectDeleteHandler(event[0]);
            })
        }
    }


    fetchWorkers():IPromise<AxiosXHR<any>> {
        return axios.get(`${this.apiUrl}cyberobjects/instances/?type=worker`);
    }

}