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
import {TaskTableViewMode} from "./Stores/TaskTable/TaskTableViewMode";
import {ViewSettings} from "./Stores/ViewSettingsStore/ViewSettings";

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
const stores = {
    cyberObjectsStore:store,
    taskTableViewMode,
    viewSettings
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
                                <GantTable />
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
