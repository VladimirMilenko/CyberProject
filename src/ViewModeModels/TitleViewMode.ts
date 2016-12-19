import {BatchModel} from "../Models/BatchModel";
import {observable} from "mobx";

interface GantRenderable {
    rnd: any;
}
interface GantRerend {
    rnd2: any;
}

export class test implements GantRenderable,GantRerend {
    rnd: any;
    rnd2: any;
}