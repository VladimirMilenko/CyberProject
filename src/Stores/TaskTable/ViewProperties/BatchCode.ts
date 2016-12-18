import {AbstractViewProperty, ViewPropertyObjectType, ViewPropertyType} from "./AbstractViewProperty";
import {observable} from "mobx";

export class BatchCode extends AbstractViewProperty{
    @observable propertyField: string;
    @observable type: ViewPropertyType = ViewPropertyType.Text;

    @observable requried: boolean = true;
    @observable objectType: ViewPropertyObjectType = ViewPropertyObjectType.Batch;

    render(object: any) {
        return undefined;
    }
    @observable propertyName:string = "Код партии";

    @observable enabled: boolean = true;

    constructor(){
        super();
    }

}