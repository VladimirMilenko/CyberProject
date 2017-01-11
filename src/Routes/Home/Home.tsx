import React,{Component} from "react";
import {GantTable} from "../../Components/GantTable/GantTable";
import Col from "antd/lib/grid/col";
import Card from "antd/lib/card/"
import {ExpandedViewState, ViewSettings} from "../../Stores/ViewSettingsStore/ViewSettings";
import {Route} from "../../Models/RouteModel";
import {CyberObjectsStore} from "../../Stores/CyberObjectsStore/CyberObjectsStore";
import {observable} from "mobx";
import {getFlatDataFromTree} from "../../TaskTree/utils/tree-data-utils";
import Row from "antd/lib/grid/row";
import moment from "moment";
import Moment = moment.Moment;
import {observer, inject} from "mobx-react";
import {GantChart} from "../../Components/GantChart";
import {CreateBatchForm} from "../../Forms/CreateBatchForm";
import Slider from "antd/lib/slider";
import Button from "antd/lib/button/button";

import classNames from 'classnames';
import {Header} from "../../Components/Header/Header";

interface HomeProps{
    cyberObjectsStore?:CyberObjectsStore;
    viewSettings?:ViewSettings;

}
interface HomeState{
    modalState:ModalState
}
class ModalState {
    @observable visible = false;
}
const marks = {
    0: 'По умолчанию',
    12: 'День',
    24: 'Час',
};
@inject("cyberObjectsStore","viewSettings")
@observer
export class Home extends Component<HomeProps,HomeState>{

    private form:any;

    constructor(){
        super();
        this.state = {
            modalState:new ModalState()
        }
    }
    setExpandedViewState(state) {
        this.props.viewSettings.setExpandedViewState(state);
    }
    onCancel(e = null) {
        const form = this.form;
        this.state.modalState.visible = false;
        form.resetFields();
    }
    onCreate(e = null) {
        const form = this.form;
        form.validateFields((err, values) => {
            console.log(err);
            if (!err) {

                let title = values['title'];
                let route = this.props.cyberObjectsStore.cyberObjectsStore.get(values['route']) as Route;
                let detailNumber = values['detailNumber'];
                let plannedStartDate = values['plannedStartDate'];
                this.state.modalState.visible = false;
                let batchInstance = this.props.cyberObjectsStore.pathConstructionAlgorithm.buildCriticalPath(title, route, detailNumber, plannedStartDate);
                form.resetFields();
            }
        });
    }

    buildCriticalPath(title: string, route: Route, detailsNumber: number, startDate: Moment) {
        let batchInstancePromise = this.props.cyberObjectsStore.pathConstructionAlgorithm.buildCriticalPath(title, route, detailsNumber, startDate);
        batchInstancePromise.then((batch) => {
            console.log(batch.uuid);
        });
    }

    saveFormRef(form) {
        this.form = form;
    }

    render(){
        let {viewSettings,cyberObjectsStore} = this.props;
        let rows = getFlatDataFromTree({
            treeData: cyberObjectsStore.gantTree, getNodeKey: ({node:_node, treeIndex}) => {
                return _node.content.uuid;
            },
            ignoreCollapsed: true
        });
        console.log(rows);
        return(
            <div>
                <Row>
                    <Header />
                    <Col span={24} style={{marginTop:20}}>
                        <Card bordered={true}>
                            <Row className="widget__header">
                                <Col span={12}>
                                    <div className="widget__header_float_left" style={{padding: '35px 60px'}}>
                                            <span onClick={()=>{this.setExpandedViewState(ExpandedViewState.Collapsed)}}
                                                  className={classNames({
                                                "options__item_squared":true,
                                                "options__item_squared_state_active": viewSettings.expandedViewState === ExpandedViewState.Collapsed
                                            })}>
                                                П
                                            </span>
                                        <span
                                            onClick={()=>{this.setExpandedViewState(ExpandedViewState.Expanded)}}
                                            className={classNames({
                                                    "options__item_squared":true,
                                                    "options__item_squared_state_active": viewSettings.expandedViewState === ExpandedViewState.Expanded})}
                                            style={{marginLeft: '10px'}}>
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
                                        <Slider max={24} min={0} marks={marks} step={12} defaultValue={0}
                                                onAfterChange={(val)=>{
                                                if(val===0){
                                                    viewSettings.headerSubItems=0;
                                                    viewSettings.cellWidth=46;
                                                }
                                                if(val===12){
                                                    viewSettings.headerSubItems =4;
                                                    viewSettings.cellWidth = 72;
                                                }
                                                if(val===24){
                                                    viewSettings.headerSubItems =24;
                                                    viewSettings.cellWidth = 450;
                                                }
                                                for(let task of cyberObjectsStore.batches.objects){
                                                    task.updatePosition();
                                                }
                                                for(let task of cyberObjectsStore.batchStages.objects){
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
                                 onCancel={this.onCancel.bind(this)} onCreate={this.onCreate.bind(this)}
                                 saveRef={this.saveFormRef.bind(this)}/>
            </div>
        )
    }

}