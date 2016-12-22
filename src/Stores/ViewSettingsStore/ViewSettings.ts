import {observable, computed} from "mobx";
import moment from 'moment';
import Moment = moment.Moment;
import {CyberObjectsStore} from "../CyberObjectsStore/CyberObjectsStore";
import {BatchModel} from "../../Models/BatchModel";
import {BatchStageModel} from "../../Models/BatchStageModel";
export class ViewSettings {
    @observable momentStart:Moment = moment();
    @observable tableEnd:Moment = moment();
    @observable tableStart:Moment = moment();
    preloadComponents:number = 4;
    currentIndex:number = 0;
    @observable cellWidth:number = 46;
    @observable currentDate = {
        month:9,
        year:2016
    };
    gantWrapper:number = null;
    defaultCellWidth:number=70;
    @observable howeredUUID :string;
    @observable selectedUUID :string;
    @observable headerSubItems:number = 4;

    store:CyberObjectsStore;
    constructor(store:CyberObjectsStore){
        this.store = store;

        this.cellWidth = this.defaultCellWidth;
        this.preloadComponents = 8;

        this.momentStart = moment(moment().format("1.MM.YYYY"),"DD.MM.YYYY");
        this.tableStart = moment(this.momentStart,"DD.MM.YYYY").add(-this.preloadComponents/4, 'M');
        this.tableEnd = moment(this.momentStart,"DD.MM.YYYY").add(this.preloadComponents/4, 'M');
    }

    setSelectedObject(uuid:string){
        let prevInstance = this.store.cyberObjectsStore.get(this.selectedUUID);
        if(prevInstance instanceof BatchModel || prevInstance instanceof BatchStageModel)
            prevInstance.selected = false;
        let instance = this.store.cyberObjectsStore.get(uuid);
        if(instance instanceof BatchModel || instance instanceof BatchStageModel)
            instance.selected = true;
        this.selectedUUID = uuid;
    }

    setHoweredObject(uuid:string){
        let prevInstance = this.store.cyberObjectsStore.get(this.howeredUUID);
        if(prevInstance instanceof BatchModel || prevInstance instanceof BatchStageModel)
            prevInstance.howered = false;
        let instance = this.store.cyberObjectsStore.get(uuid);
        if(instance instanceof BatchModel || instance instanceof BatchStageModel)
            instance.howered = true;
        this.howeredUUID = uuid;
    }

    @computed get itemsCount(){
        let temp = moment(this.tableStart);
        let momentEnd = moment(this.tableEnd);
        let days =  Math.abs(momentEnd.diff(temp, 'days'));
        return days;
    }
    @computed get headerItems() {
        let result = [];
        let temp = moment(this.tableStart);
        let momentEnd = moment(this.tableEnd);
        let itemsCount = Math.abs(momentEnd.diff(temp, 'days'));
        for (let i = 0; i < itemsCount; i++) {
            result.push({
                title: temp.locale('ru').format("dd DD").toLowerCase(),
                isWeekend: temp.isoWeekday() >= 6
            });
            temp.add(1, 'd');
        }
        return result;
    }
    @computed get currentDateMoment(){
        return moment(`01.${this.currentDate.month+1}.${this.currentDate.year}`,'DD.MM.YYYY');
    }
    @computed get rowWidth(){
        return this.itemsCount * (this.cellWidth + 2);
    }

}