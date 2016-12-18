export abstract class AbstractStatus {
  abstract status:any;
  abstract statusParameterName:string;
  abstract fromJS(json:any):void;
  abstract renderStatus():void;
}
export default AbstractStatus;