import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {AbstractStatus} from "./StatusParameters/AbstractStatus";
import {PipelineStatus} from "./StatusParameters/PipelineStatus";
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";
import {CyberObjectsStore} from "./Stores/CyberObjectsStore/CyberObjectsStore";
import {Route} from "./Models/RouteModel";
import {CyberPlantTransportLayer} from "./TransportLayers/CyberPlantTransportLayer";
import {WorkerModel} from "./Models/WorkerModel";
import {CyberObejctType} from "./Models/BasicTypes/CyberObjectTypes";
import axios from 'axios';
import Button from "antd/lib/button/button";
import Card from "antd/lib/card/";
import './styles/antd.scss';


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
        let store = new CyberObjectsStore();
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
    }

    render() {

        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Card bordered={true}>
                            Test
                        </Card>
                    </Col>
                    <Col span={12}>
                    </Col>
                    <Col span={12}>
                    </Col>
                </Row>
            </div>
        );
    }
}
;

const appState = new AppState();
ReactDOM.render(<TimerView appState={appState}/>, document.getElementById('root'));
