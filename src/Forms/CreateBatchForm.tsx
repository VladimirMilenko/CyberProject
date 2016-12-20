import React from 'react';
import Form from "antd/lib/form/Form";

const FormItem = Form.Item;

@Form
export class CreateBatchForm extends React.Component<{},{}>{
    render(){
        return(
            <Form horizontal>
                <FormItem>
                    
                </FormItem>
            </Form>
        )
    }
}