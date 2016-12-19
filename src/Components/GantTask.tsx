import React from "react";
import {StageModel} from "../Models/StageModel";
import {BatchModel} from "../Models/BatchModel";
import {CyberObjectsStore} from "../Stores/CyberObjectsStore/CyberObjectsStore";
interface GantModel {
    dragStarted(): void;
    dragStopped(e: any, d: any): void;
    resizeStarted(direction: string, data: any): void;
    resizeStopped(direction: string, data: any): void;
    resizeEvent(event: any, direction: string, styleSize: any, clientSize: any, delta: number, newPos: any): void;
}

interface TreeRow {
    path: Array<string>|Array<number>;
    content: StageModel|BatchModel;
    children: Array<TreeRow>;
}

interface GantTaskProps {
    row: TreeRow;
    store: CyberObjectsStore;
    style: any;
}

export class GantTask extends React.Component<GantTaskProps,{}> implements GantModel {
    dragStarted() {

    }

    dragStopped(e: any, d: any) {

    }

    resizeEvent(event: any, direction: string, styleSize: any, clientSize: any, delta: number, newPos: any) {

    }

    resizeStarted(direction: string, data: any) {

    }

    resizeStopped(direction: string, data: any) {

    }

    render() {
        return (<div>

        </div>)
    }
}