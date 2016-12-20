import React from "react";
import {CyberObjectsStore} from "../Stores/CyberObjectsStore/CyberObjectsStore";
import {BatchStageModel} from "../Models/BatchStageModel";
import {BatchModel} from "../Models/BatchModel";
export interface GantModel {
    rndObject:any;
    dragged(hours:number): void;
    resized(direction:string, hours:number): void;
}
export interface Selectable{
    selected:boolean;
    howered:boolean;
}

interface TreeRow {
    path: Array<string>|Array<number>;
    content: BatchStageModel|BatchModel;
    children: Array<TreeRow>;
}

interface GantTaskProps {
    row: TreeRow;
    store: CyberObjectsStore;
    style: any;
}

