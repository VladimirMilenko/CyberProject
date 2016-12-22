import React from 'react';
import Form from "antd/lib/form/Form";
import Input from "antd/lib/input/Input";
import {FormComponentProps} from "antd/lib/form/Form";
import {CyberObjectsStore} from "../Stores/CyberObjectsStore/CyberObjectsStore";
import {inject} from "mobx-react";
import Select from "antd/lib/select";
import InputNumber from "antd/lib/input-number";
import DatePicker from 'antd/lib/date-picker/';
import moment from 'moment';
import * as Moment from "moment";
import Modal from "antd/lib/modal/Modal";

const FormItem = Form.Item;

@inject("cyberObjectsStore")
@Form.create()
export class CreateBatchForm extends React.Component<{form?, cyberObjectsStore?: CyberObjectsStore,visible:boolean,onCancel:any,onCreate,saveRef},{}> {
    render() {
        let {getFieldDecorator} = (this.props as FormComponentProps).form;
        this.props.saveRef((this.props as FormComponentProps).form);
        return (
            <Modal visible={this.props.visible}
                   onCancel={this.props.onCancel}
                   onOk={this.props.onCreate}>
                <Form >
                    <FormItem label="Название партии"
                    >
                        {getFieldDecorator('title', {
                            rules: [{required: true, message: 'Название партии обязательно!'}],
                        })(
                            <Input placeholder="Введите название партии"/>
                        )}
                    </FormItem>
                    <FormItem label="Деталь"
                    >
                        {getFieldDecorator('route', {
                            rules: [{required: true, message: 'Выбор технологического маршрута обязателен!'}],
                        })(
                            <Select style={{border:'1px solid #d9d9d9', borderRadius:'4px'}}
                                    placeholder="Введите название партии">
                                {
                                    this.props.cyberObjectsStore.routes.objects.map((route, index) => {
                                        return (
                                            <Select.Option key={route.uuid}
                                                           value={route.uuid}>{route.name}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="Количество деталей"
                    >
                        {getFieldDecorator('detailNumber', {
                            rules: [{required: true, message: 'Количество деталей обязательно!'}],
                        })(
                            <InputNumber style={{width:'100%'}}/>
                        )}
                    </FormItem>
                    <FormItem label="Количество деталей"
                    >
                        {getFieldDecorator('plannedStartDate', {
                            rules: [{required: true, message: 'Дата начала партии обязательна!'}],
                            initialValue: moment()
                        })(
                            <DatePicker format={"DD.MM.YYYY"} style={{width:'100%'}} showTime={false}/>
                        )}
                    </FormItem>
                </Form></Modal>
        )
    }
}