import React,{Component} from "react";
import Row from "antd/lib/grid/row";
import Col from "antd/lib/grid/col";
import {ParticipantsList} from "../../Components/ParticipantsList";
import {Calendar} from "../../Components/Calendar";
import {Header} from "../../Components/Header/Header";
import {observer} from "mobx-react";
import Card from "antd/lib/card/"


@observer
export class Workers extends Component<{},{}>{
    render(){
        return(
            <Row>
                <Col span={24}>
                    <Header />
                </Col>
                <Col span={24}  style={{marginTop:20}}>
                    <Card>
                        <Row>
                            <Col span={8}>
                                <ParticipantsList />
                            </Col>
                            <Col span={16}>
                                <Calendar />
                            </Col>
                        </Row>
                    </Card>
                </Col>

            </Row>
        )
    }
}