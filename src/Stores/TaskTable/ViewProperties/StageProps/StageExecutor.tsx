import {StageViewProperty} from "./StageViewProperty";
import React from 'react';
import {BatchStageModel} from "../../../../Models/BatchStageModel";
import {ViewPropertyType} from "../AbstractViewProperty";
import ReactElement = React.ReactElement;
import {CyberObjectsStore} from "../../../CyberObjectsStore/CyberObjectsStore";
import Select from "antd/lib/select";
export class StageExecutor extends StageViewProperty{
    required: boolean = true;
    enabled: boolean = true;
    viewPropertyType: ViewPropertyType;
    private store: CyberObjectsStore;
    constructor(store:CyberObjectsStore){
        super();
        this.store = store;
    }
    render(object: BatchStageModel): ReactElement<any> {
        let background = 'white';
        if(object.howered)
            background = '#b8fde3';
        if(object.selected)
            background = '#40ffad';
        let executor = 'Не указано';
        if(object.worker && object.worker.name)
            executor = object.worker.name;
        return (
            <td key="stageExecutor" style={{background:background}} className="rst__table__cell">
                <Select
                    style={{ width: 200 }}
                    defaultValue={object.worker.name}
                    placeholder="Выберите исполнителя"
                    optionFilterProp="children"
                    onChange={(newVal)=>{this.handleChange(object,newVal)}}
                >
                    {
                        object.worker.specialization.workerSet.map((worker)=>{
                            return(
                                <Select.Option key={worker.uuid} value={worker.uuid}>{worker.name}</Select.Option>
                            )
                        })
                    }
                </Select>
            </td>
        );
    }
    handleChange(object:BatchStageModel,newVal){
        //this.store.pathConstructionAlgorithm.buildCriticalPath(object.)
    }
    renderHeader(): ReactElement<any> {
        return <td key="stageExecutor" className="rst__table__cell__header">Исполнитель</td> ;
    }

}
