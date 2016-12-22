import axios from 'axios';
import {AbstractTransportLayer} from "./AbstractTransportLayer";
import IPromise = Axios.IPromise;
import AxiosXHR = Axios.AxiosXHR;
import * as autobahn from "autobahn";
import {Connection} from "autobahn";

export const updateChannel = 'cyber-platform.vpered.0-1-0.sandbox.cyberobjects.instances.updated';
export const createChannel = 'cyber-platform.vpered.0-1-0.sandbox.cyberobjects.instances.created';

export class CyberPlantTransportLayer extends AbstractTransportLayer{
    private socketConnection:Connection;

    constructor(store,objectCreatedHandler,objectUpdatedHandler){
        super(store,objectCreatedHandler,objectUpdatedHandler);
        this.connectToWS();
    }
    createObject(type: string, object: any): Axios.IPromise<Axios.AxiosXHR<any>> {
        return axios.post(
            `http://sandbox.plant.cyber-platform.ru/api/cyberobjects/instances/create/`,
            [type,object]
        );
    }
    updateObject(object:any){
        return axios.post(
            `http://sandbox.plant.cyber-platform.ru/api/cyberobjects/instances/update/`,
            {uuid:object.uuid,...object}
        );
    }
    connectToWS() {

        this.socketConnection = new autobahn.Connection({
            url: "ws://crossbario.sandbox.0-1-0.vpered.cyber-platform.ru/ws",
            realm: 'cyber-platform'
        });
        this.socketConnection.open();
        this.socketConnection.onopen = (session) => {

            session.subscribe(updateChannel, (event) => {
                this.objectUpdatedHandler(event[0]);
            });

            session.subscribe(createChannel, (event) => {
                console.log('obj created');
                this.objectCreatedHandler(event[0]);
            });
        }
    }


    fetchWorkers():IPromise<AxiosXHR<any>> {
        return axios.get(`http://sandbox.plant.cyber-platform.ru/api/cyberobjects/instances/?type=worker`);
    }

}