import React, { useEffect, useState } from 'react';
import {  Layout, theme, Form,InputNumber,Button,Slider, SliderSingleProps,Col,Radio,message } from 'antd';
import { getSettings, postSettings, updateSettings } from '../../Services/ApiService';

const { Content } = Layout;

const marks: SliderSingleProps['marks'] = {
  0: '0',
  10: '10'
};

const methods = [
  {label:'Sound',value:1},
  {label:'Lights',value:2},
  {label:'Vibrations',value:3}
];


const validateMessages = {
  required: '${label} is required!',
};

const user_id = localStorage.getItem('user_id');

function Settings() {
  const [form] = Form.useForm();
  const [userId,setUserId] = useState(user_id)
  const [messageApi, contextHolder] = message.useMessage();

  const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

  
  const submitValues = async (val: any)=>{
    if (userId){
      await updateSettings(val.user)
      messageApi.open({
        type: 'success',
        content: 'Settings Updated Successfully',
      });
    }
    else{
      const responseData = await postSettings(val.user);
      setUserId(responseData.user_id);
      messageApi.open({
        type: 'success',
        content: 'Settings Created Successfully',
      });
    }
  }

  useEffect(() =>  {
    getSettings().then((responseData)=>{
      if(responseData)
        form.setFieldsValue({user:responseData})

     });
  }, [form])
  


    return(
       <Col span={12}>
        {contextHolder}
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
            <Form.Item  name={['user', 'user_age']} label="Age" rules={[{ required:true }]}>
              <InputNumber  suffix="Years" style={{ width: '100%' }}   placeholder="Age of the user" min={0} max={99}/>
            </Form.Item>
            <Form.Item name={['user', 'bed_quality']} label="Bed Quality" rules={[{ required: true }]}>
             <Slider min={0} max={10} marks={marks} />
            </Form.Item>
            <Form.Item name={['user', 'ambient_noise']} label="Ambient Noise" rules={[{ required: true }]}>
             <Slider min={0} max={10} marks={marks} />
            </Form.Item>
            <Form.Item  name={['user', 'preffered_wake_method']} label="Wake up Method" rules={[{ required: true }]}>
              <Radio.Group block options={methods} defaultValue="1"  optionType="button" />      
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
