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

const marks = {
    4: 'День',
    24: 'Час',
};
let store = new CyberObjectsStore();
let taskTableViewMode = new TaskTableViewMode();
store.transportLayer = new CyberPlantTransportLayer(() => {
}, () => {
});
store.transportLayer.fetchWorkers()
    .then((response) => {
        for (let instance of response.data.instances) {
            let worker = store.createWorker(instance);
            console.log(worker.specialization);
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

    buildCriticalPath(route: Route) {
        console.log(route);
        let startDate = moment("21.12.2016", "DD.MM.YYYY");
        let detailNumber = 10;
        let currentDate = moment(startDate);

        for (let stage of route.routeStageSet) {
            let spec = stage.specialization;
            let durationInHrs = stage.duration * detailNumber + stage.setupDuration;
            let stageDurationInDays = Math.ceil(durationInHrs / 8);//stage duration in 8hr days
            let realHours = 0;
            while (realHours < durationInHrs) {
                if(currentDate.isoWeekday()<6) {
                    let workingEquipment = spec.equipmentSet.find(equip => equip.isWorkingAtDate(currentDate));
                    if (workingEquipment) {
                        let workingWorker = spec.workerSet.find(worker => worker.isWorkingAtDate(currentDate))
                        if (workingWorker) {
                            if (durationInHrs - realHours > 8)
                                console.log(`Date: ${currentDate.format("DD.MM.YYYY")}, Equipment:${workingEquipment.name}, Worker:${workingWorker.name}. Time: 8:00-17:00`);
                            else {
                                let time = 8 + (durationInHrs - realHours);
                                console.log(`Date: ${currentDate.format("DD.MM.YYYY")}, Equipment:${workingEquipment.name}, Worker:${workingWorker.name}. Time: 8:00-${time}:00`);
                            }
                        } else {
                            stageDurationInDays++;
                        }
                    } else {
                        stageDurationInDays++;
                    }
                realHours+=8;
                }
                currentDate = currentDate.add(1, 'd');
            }

        }
    }

    componentDidMount() {

        axios.get('http://sandbox.plant.cyber-platform.ru/api/cyberobjects/instances/?type=route&go_deeper_level=3')
            .then((response) => {
                if (response.data) {
                    let data: any = response.data;
                    for (let route of data.instances) {
                        if (route instanceof Object) {
                            let routeInstance = store.createRoute(route);
                            this.buildCriticalPath(routeInstance);
                            console.log('New Route Instance');
                            console.log(routeInstance);
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
                                console.log(batchInstance);
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
                                    <Row>
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
                                        <Col span={3}
                                             style={{position:'relative', overflow:'hidden',overflowX:'auto', height:rows.length*31+60}}>
                                            <GantTable />
                                        </Col>
                                        <Col>
                                            <GantChart />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <Modal visible={this.state.modalState.visible} title="Create a new collection"
                               okText="Create"
                               onCancel={(e)=>this.onCancel(e)}
                               onOk={()=>this.onCancel()}>
                            <CreateBatchForm ref={(ref)=>this.saveFormRef(ref)}/>
                        </Modal>
                    </div>
                </LocaleProvider>
            </Provider>

        );
    }

    onCancel(e = null) {
        console.log(e);
    }

    saveFormRef(ref) {
        this.form = ref;
        console.log(this.form);
    }
}
;

const appState = new AppState();
ReactDOM.render(<TimerView appState={appState}/>, document.getElementById('root'));
