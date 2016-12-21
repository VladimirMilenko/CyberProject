import {CyberObjectInstance} from "./BasicTypes/CyberObjectInstance";
import {observable, computed} from "mobx";
import {isUndefined} from "util";
import moment from 'moment/moment';
import Moment = moment.Moment;
export class EquipmentModel extends CyberObjectInstance {
    @observable name;
    @observable code;
    @observable status;
    @observable nonWorkingDaysSet:Array<string> = ["31.12.2016","1.1.2017"];

    fromJson(object: any) {
        super.fromJson(object);
        if (!isUndefined(object.name))
            this.name = object.name;
        if (!isUndefined(object.code != undefined))
            this.code = object.code;
        if (!isUndefined(object.status != undefined))
            this.status = object.status;

    }
    isWorkingAtDate(date:Moment):boolean{
        for(let day of this.nonWorkingDaysSet){
            if(date.isSame(moment(day,"DD.MM.YYYY"),'day'))
                return false;
        }
        return true;
    }
    @computed get toJson() {
        return {
            uuid: this.uuid,
            name: this.name,
            code: this.code,
            status: this.status
        }
    }
}