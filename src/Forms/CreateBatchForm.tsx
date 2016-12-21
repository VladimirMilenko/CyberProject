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

const FormItem = Form.Item;

@inject("cyberObjectsStore")
@Form.create()
export class CreateBatchForm extends React.Component<{form?, cyberObjectsStore?:CyberObjectsStore},{}>{
    render(){
        let {getFieldDecorator} = (this.props as FormComponentProps).form;
        return(
            <Form>
                <FormItem label="Название партии"
                          >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Название партии обязательно!' }],
                    })(
                        <Input placeholder="Введите название партии" />
                    )}
                </FormItem>
                <FormItem label="Деталь"
                >
                    {getFieldDecorator('batchStage', {
                        rules: [{ required: true, message: 'Выбор технологического маршрута обязателен!' }],
                    })(
                        <Select style={{border:'1px solid #d9d9d9', borderRadius:'4px'}} placeholder="Введите название партии">
                            {
                                this.props.cyberObjectsStore.routes.objects.map((route,index)=>{
                                    return(
                                        <Select.Option key={route.uuid} value={route.uuid}>{route.name}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem label="Количество деталей"
                >
                    {getFieldDecorator('detailsNumber', {
                        rules: [{ required: true, message: 'Количество деталей обязательно!' }],
                    })(
                        <InputNumber style={{width:'100%'}} />
                    )}
                </FormItem>
                <FormItem label="Количество деталей"
                >
                    {getFieldDecorator('plannedStartDate', {
                        rules: [{ required: true, message: 'Дата начала партии обязательна!' }],
                        initialValue:moment()
                    })(
                        <DatePicker format={"DD.MM.YYYY"} style={{width:'100%'}} showTime={false}/>
                    )}
                </FormItem>
            </Form>
        )
    }
}