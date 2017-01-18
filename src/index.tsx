import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observer, Provider} from 'mobx-react';
import {CyberObjectsStore} from "./Stores/CyberObjectsStore/CyberObjectsStore";
import {CyberPlantTransportLayer} from "./TransportLayers/CyberPlantTransportLayer";
import axios from 'axios';
import './static/styles/core.scss';
import {ViewSettings} from "./Stores/ViewSettingsStore/ViewSettings";
import {TaskTableViewMode} from "./Stores/TaskTable/TaskTableViewMode";
import LocaleProvider from "antd/lib/locale-provider";
import ruRU from 'antd/lib/locale-provider/ru_RU'
import moment from 'moment/moment';
import Moment = moment.Moment;

import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import {Router,hashHistory, Route} from "react-router";
import {Home} from "./Routes/Home/Home";
import {CalendarStore} from "./Stores/CalendarStore/CalendarStore";
import {Workers} from "./Routes/Workers/Workers";
declare var options;
console.log(options);
let store = new CyberObjectsStore();
let calendarStore = new CalendarStore();
let taskTableViewMode = new TaskTableViewMode(store);
store.transportLayer = new CyberPlantTransportLayer(store, objectCreated, objectUpdated,objectDeleted);
store.transportLayer.apiUrl = options.apiURL;
store.transportLayer.connectToWS(options.websocketsSettings.uri,options.websocketsSettings.realm,options.websocketsSettings.prefix);

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

export function objectDeleted(deleteParams){
    let uuid = deleteParams.cyberobjectInstanceUUID;
    let type = deleteParams.cyberobjectName;
    switch (type) {
        case "batch":
            store.removeBatch(store.batches.findByUUID(uuid),false);
            break;
    }
}

store.transportLayer.fetchWorkers()
    .then((response) => {
        for (let instance of response.data.instances) {
            let worker = store.createWorker(instance);
        }
    });

const routingStore = new RouterStore();
const history = syncHistoryWithStore(hashHistory, routingStore);

let viewSettings = new ViewSettings(store);
store.setViewSettings(viewSettings);
store.viewSettings.projectName = options.cyberObjectInstance.data.title;
const stores = {
    cyberObjectsStore: store,
    taskTableViewMode: taskTableViewMode,
    viewSettings: viewSettings,
    routingStore:routingStore,
    calendarStore:calendarStore
};
@observer
class MainApp extends React.Component<{},{}> {
    form: any;

    constructor() {
        super();
    }

    componentDidMount() {
        viewSettings.loading = true;
        axios.get(`${store.transportLayer.apiUrl}cyberobjects/instances/?type=route&go_deeper_level=4`)
            .then((response) => {
                if (response.data) {
                    let data: any = response.data;
                    for (let route of data.instances) {
                        if (route instanceof Object) {
                            let routeInstance = store.createRoute(route);
                        }
                    }
                    axios.get(`${store.transportLayer.apiUrl}cyberobjects/instances/?type=batch&go_deeper_level=4`)
                        .then((response) => {
                            if (response.data) {
                                let data: any = response.data;
                                for (let batch of data.instances) {
                                    if (batch instanceof Object) {
                                        let routeInstance = store.createBatch(batch);
                                    }
                                }
                                viewSettings.loading=false;
                            }
                        });
                }
            });
    }

    render() {
        return (
            <Provider {...stores}>
                <LocaleProvider locale={ruRU} children={null}>
                    <Router history={history}>
                        <Route path="/" component={Home}/>
                        <Route path="/workers" component={Workers} />
                    </Router>
                </LocaleProvider>
            </Provider>

        );
    }

}

ReactDOM.render( <MainApp />, document.getElementById('root'));
