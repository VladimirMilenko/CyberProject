import {ViewPropertyObjectType} from "../../Stores/TaskTable/ViewProperties/AbstractViewProperty";
import {observable} from "mobx";
import {AbstractTask, CyberObjectType} from "./AbstractTask";

class Stage extends AbstractTask{
    autoUpdate:boolean = true;
    uuid:string = "";
    key:string = "";
    objectType= CyberObjectType.Stage;
}
