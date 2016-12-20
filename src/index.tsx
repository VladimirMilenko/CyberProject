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
    cyberObjectsStore:store,
    taskTableViewMode:taskTableViewMode,
    viewSettings:viewSettings
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
@observer
class TimerView extends React.Component<{appState: AppState}, {}> {
    componentDidMount() {

        axios.get('http://sandbox.plant.cyber-platform.ru/api/cyberobjects/instances/?type=route&go_deeper_level=3')
            .then((response) => {
                if (response.data) {
                    let data: any = response.data;
                    for (let route of data.instances) {
                        if (route instanceof Object) {
                            let routeInstance = store.createRoute(route);
                            console.log('New Route Instance');
                            console.log(routeInstance);
                        }
                    }
                }
            });
        axios.get('http://sandbox.vpered.cyber-platform.ru/api/cyberobjects/instances/?uuid=adc6e5fa-8327-46b2-a7f8-c5056a9229a4&go_deeper_level=2')
            .then((response)=>{
                if(response.data){
                    let data:any = response.data;
                    for(let instance of data.instances){
                        if(instance.batchSet){
                            for(let batch of instance.batchSet){
                                let batchInstance = store.createBatch(batch);
                                console.log(batchInstance);
                            }
                        }
                    }
                }
            })
    }

    render() {

        return (
            <Provider {...stores}>
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
                                            <span style={{marginLeft: '50px', fontSize: '15px', fontWeight: 'bold'}}>
                                                План производства
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <div className="widget__header_float_right" style={{padding: '35px 60px'}}>
                                            <Button size="large" type="primary" onClick={(e) => console.log('click')}>Добавить</Button>
                                            <Slider  max={24} min={4} marks={marks} step={null} defaultValue={4} onAfterChange={(val)=>{
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
                                            }} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={3}>
                                        <GantTable />
                                    </Col>
                                    <Col>
                                        <GantChart />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Provider>

        );
    }
}
;

const appState = new AppState();
ReactDOM.render(<TimerView appState={appState}/>, document.getElementById('root'));
