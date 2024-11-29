import React from 'react';
import {  Layout, theme, Form,InputNumber,Button,Slider, SliderSingleProps,Col,Radio } from 'antd';

const { Content } = Layout;

const marks: SliderSingleProps['marks'] = {
  0: '0',
  10: '10'
};

const methods = [
  {label:'Sound',value:'sound'},
  {label:'Lights',value:'lights'},
  {label:'Vibrations',value:'vibrations'}
];


const validateMessages = {
  required: '${label} is required!',
};

function Settings() {
  const [form] = Form.useForm();
  const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
  
  const submitValues = async (val: any)=>{
        try {
          const response = await fetch("http://127.0.0.1:8000/fuzzy/",{
            method:"POST",
            headers:{
              'Content-Type':'application/json'
  
            },
            body:JSON.stringify(val.user)
          })
          const responseData = await response.json();
          console.log(responseData); 
        } catch (error) {
          console.log(error)
        }
    }


    return(
       <Col span={12}>
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
           <Form
            layout={'vertical'}
            form={form}
            onFinish={(val)=>submitValues(val)}
            validateMessages={validateMessages}
           >
            <Form.Item name={['user', 'user_age']} label="Age" rules={[{ required:true }]}>
              <InputNumber suffix="Years" style={{ width: '100%' }} placeholder="Age of the user" min={0} max={99}/>
            </Form.Item>
            <Form.Item name={['user', 'bed_quality']} label="Bed Quality" rules={[{ required: true }]}>
             <Slider min={0} max={10} marks={marks} />
            </Form.Item>
            <Form.Item name={['user', 'ambient_noise']} label="Ambient Noise" rules={[{ required: true }]}>
             <Slider min={0} max={10} marks={marks} />
            </Form.Item>
            <Form.Item name={['user', 'preferred_wake_method']} label="Wake up Method" rules={[{ required: true }]}>
              <Radio.Group block options={methods} defaultValue="sound"  optionType="button" />      
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType='submit'>Submit</Button>
            </Form.Item>
          </Form>
        </Content>
        </Col>
        )
}

export default Settings;
