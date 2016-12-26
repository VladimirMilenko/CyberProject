import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer, Provider} from 'mobx-react';
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";
import {CyberObjectsStore} from "./Stores/CyberObjectsStore/CyberObjectsStore";
import {CyberPlantTransportLayer} from "./TransportLayers/CyberPlantTransportLayer";
import axios from 'axios';
import Card from "antd/lib/card/";
import './static/styles/core.scss';
import {GantTable} from "./Components/GantTable/GantTable";
import {ViewSettings} from "./Stores/ViewSettingsStore/ViewSettings";
import {TaskTableViewMode} from "./Stores/TaskTable/TaskTableViewMode";
import {GantChart} from "./Components/GantChart";
import Button from "antd/lib/button/button";
import Slider from "antd/lib/slider";
import {getFlatDataFromTree} from "./TaskTree/utils/tree-data-utils";
import Modal from "antd/lib/modal/Modal";
import {CreateBatchForm} from "./Forms/CreateBatchForm";
import LocaleProvider from "antd/lib/locale-provider";
import ruRU from 'antd/lib/locale-provider/ru_RU'
import {FormProps, default as Form} from "antd/lib/form/Form";
import {RouteStageModel} from "./Models/RouteStageModel";
import {Route} from "./Models/RouteModel";
import moment from 'moment/moment';
import {SpecializationModel} from "./Models/SpecializationModel";
import Moment = moment.Moment;
import {WorkerModel} from "./Models/WorkerModel";
import {EquipmentModel} from "./Models/EquipmentModel";
import {isNullOrUndefined} from "util";
import {SimpleCriticalPath} from "./CriticalPathConstruction/SimpleCriticalPath";

const marks = {
    4: 'День',
    24: 'Час',
};
let store = new CyberObjectsStore();
let simpleCriticalPath = new SimpleCriticalPath(store);
let taskTableViewMode = new TaskTableViewMode(store);
store.transportLayer = new CyberPlantTransportLayer(store, objectUpdated, objectCreated);
store.transportLayer.connectToWS();

export function objectUpdated(updateParams) {
    let uuid = updateParams.cyberobjectInstanceUUID;
    let type = updateParams.cyberobjectName;
    let updatedData = updateParams.cyberobjectInstanceUpdatedData;
    let instance = store.cyberObjectsStore.get(uuid);
    instance.fromJson(updatedData);
}
export function objectCreated(createParams) {
    let type = createParams.cyberobjectName;
    let uuid = createParams.cyberobjectInstanceUUID;
    let json = createParams.cyberobjectInstance;
    switch (type) {
        case "batch":
            store.createBatch({...json, uuid: uuid});
            break;
        case "batchStage":
            store.createBatchStage({...json, uuid: uuid});
    }
}

store.transportLayer.fetchWorkers()
    .then((response) => {
        for (let instance of response.data.instances) {
            let worker = store.createWorker(instance);
        }
    });
let viewSettings = new ViewSettings(store);
store.setViewSettings(viewSettings);
const stores = {
    cyberObjectsStore: store,
    taskTableViewMode: taskTableViewMode,
    viewSettings: viewSettings
};
class AppState {
    @observable timer = 0;

    constructor() {
        setInterval(() => {
            this.timer += 1;
        }, 1000);
    }

    resetTimer() {
        this.timer = 0;
    }
}
class ModalState {
    @observable visible = false;
}
@observer
class TimerView extends React.Component<{appState: AppState}, {modalState: ModalState}> {
    form: any;

    constructor() {
        super();
        this.state = {
            modalState: new ModalState()
        };
    }

    componentDidMount() {

        axios.get('http://sandbox.plant.cyber-platform.ru/api/cyberobjects/instances/?type=route&go_deeper_level=4')
            .then((response) => {
                if (response.data) {
                    let data: any = response.data;
                    for (let route of data.instances) {
                        if (route instanceof Object) {
                            let routeInstance = store.createRoute(route);
                        }
                    }
                }
            });
        axios.get('http://sandbox.vpered.cyber-platform.ru/api/cyberobjects/instances/?uuid=adc6e5fa-8327-46b2-a7f8-c5056a9229a4&go_deeper_level=2')
            .then((response) => {
                if (response.data) {
                    let data: any = response.data;
                    for (let instance of data.instances) {
                        if (instance.batchSet) {
                            for (let batch of instance.batchSet) {
                                let batchInstance = store.createBatch(batch);
                            }
                        }
                    }
                }
            })
    }

    render() {
        let rows = getFlatDataFromTree({
            treeData: store.gantTree, getNodeKey: ({node:_node, treeIndex}) => {
                return _node.content.uuid;
            },
            ignoreCollapsed: true
        });
        return (
            <Provider {...stores}>
                <LocaleProvider locale={ruRU} children={null}>
                    <div>
                        <Row>
                            <Col span={24}>
                                <Card bordered={true}>
                                    Test
                                </Card>
                            </Col>
                            <Col span={24} style={{marginTop:20}}>
                                <Card bordered={true}>
                                    <Row className="widget__header">
                                        <Col span={12}>
                                            <div className="widget__header_float_left" style={{padding: '35px 60px'}}>
                                            <span className="options__item_squared options__item_squared_state_active">
                                                П
                                            </span>
                                                <span className="options__item_squared" style={{marginLeft: '10px'}}>
                                                1
                                            </span>
                                                <span className="options__item_squared" style={{marginLeft: '10px'}}>
                                                2
                                            </span>
                                                <span className="options__item_squared" style={{marginLeft: '10px'}}>
                                                3
                                            </span>
                                                <span className="options__item_squared" style={{marginLeft: '10px'}}>
                                                Все
                                            </span>
                                                <span
                                                    style={{marginLeft: '50px', fontSize: '15px', fontWeight: 'bold'}}>
                                                План производства
                                            </span>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div className="widget__header_float_right" style={{padding: '35px 60px'}}>
                                                <Button size="large" type="primary"
                                                        onClick={(e) => this.state.modalState.visible = !this.state.modalState.visible}>Добавить</Button>
                                                <Slider max={24} min={4} marks={marks} step={null} defaultValue={4}
                                                        onAfterChange={(val)=>{
                                                if(val==4){
                                                    viewSettings.headerSubItems =4;
                                                    viewSettings.cellWidth = 72;
                                                } else{
                                                    viewSettings.headerSubItems =24;
                                                    viewSettings.cellWidth = 450;
                                                }
                                                for(let task of store.batches.objects){
                                                    task.updatePosition();
                                                }
                                                for(let task of store.batchStages.objects){
                                                    task.updatePosition();
                                                }
                                            }}/>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={11}
                                             style={{position:'relative', overflow:'hidden',overflowX:'auto', height:rows.length*31+160}}>
                                            <GantTable />
                                        </Col>
                                        <Col>
                                            <GantChart />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <CreateBatchForm visible={this.state.modalState.visible}
                                         onCancel={this.onCancel.bind(this)} onCreate={this.onCreate.bind(this)} saveRef={this.saveFormRef.bind(this)}/>
                    </div>
                </LocaleProvider>
            </Provider>

        );
    }

    onCancel(e = null) {
        const form = this.form;
        this.state.modalState.visible = false;
        form.resetFields();
    }

    onCreate(e = null) {
        const form = this.form;
        form.validateFields((err,values)=>{
           if(!err){
               let title = values['title'];
               let route = store.cyberObjectsStore.get(values['route']) as Route;
               let detailNumber = values['detailNumber'];
               let plannedStartDate = values['plannedStartDate'];
               this.state.modalState.visible = false;
               let batchInstance = store.pathConstructionAlgorithm.buildCriticalPath(title,route,detailNumber,plannedStartDate);
               form.resetFields();
           }
        });
    }
    buildCriticalPath(title:string,route:Route,detailsNumber:number,startDate:Moment){
        let batchInstancePromise = simpleCriticalPath.buildCriticalPath(title,route,detailsNumber,startDate);
        batchInstancePromise.then((batch)=>{
            console.log(batch.uuid);
        });
    }
    saveFormRef(form) {
        this.form = form;
    }
}

const appState = new AppState();
ReactDOM.render( <TimerView appState={appState}/>, document.getElementById('root'));
