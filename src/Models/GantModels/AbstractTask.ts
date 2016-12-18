export abstract class AbstractTask{
    abstract autoUpdate:boolean;
    abstract uuid:string;
    abstract key:string;
    abstract objectType:CyberObjectType;
}
export enum CyberObjectType {
    Batch, Stage
}