import axios from 'axios';
import {AbstractTransportLayer} from "./AbstractTransportLayer";
import IPromise = Axios.IPromise;
import AxiosXHR = Axios.AxiosXHR;


export class CyberPlantTransportLayer extends AbstractTransportLayer{
    constructor(objectCreatedHandler,objectUpdatedHandler){
        super(objectCreatedHandler,objectUpdatedHandler);
    }
    fetchWorkers():IPromise<AxiosXHR<any>> {
        return axios.get(`http://sandbox.plant.cyber-platform.ru/api/cyberobjects/instances/?type=worker`);
    }

}