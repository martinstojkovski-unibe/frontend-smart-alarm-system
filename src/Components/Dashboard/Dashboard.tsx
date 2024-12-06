import React ,{useEffect, useState} from 'react';
import {  Layout, theme ,Slider, SliderSingleProps, Col, Row, Button, Card,Typography,Avatar,Form ,InputNumber,message} from 'antd';
import { useGeolocated } from "react-geolocated";
import { getSettings, updateSettings } from '../../Services/ApiService';


const { Title } = Typography;
const { Content } = Layout;
const { Meta } = Card;

const marks: SliderSingleProps['marks'] = {
  0: '0',
  10: '10'
};

const validateMessages = {
  required: '${label} is required!',
};

const user_id = localStorage.getItem('user_id');


function Dashboard() {

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const [weatherdata,setWeatherData]=useState({text:'',image:'',temperature:0.0})

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();


    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    useEffect(()=>{
      if(coords){
        fetch(`http://api.weatherapi.com/v1/current.json?key=3856be57b9a24d88895140604242211&q=${coords?.latitude},${coords?.longitude}&aqi=no`)
        .then(response => response.json())
        .then(data => {
          if(data !== undefined){
            setWeatherData({text: data?.current?.condition?.text,image:data?.current?.condition?.icon,temperature:data?.current?.feelslike_c})
            if(user_id){
              updateSettings({temperature:data?.current?.feelslike_c,wind_speed:data?.current?.wind_kph,humidity:data?.current?.humidity}).then(
                (responseData)=>{
                  messageApi.open({
                    type: 'success',
                    content: 'Weather Data Updated Successfully',
                  });
                })                
            }
          }  
        })
      }
      
    },[coords])

    console.log(weatherdata)


     const submitValues = async (val: any)=>{
      if (user_id){
        const responseData = await updateSettings(val.user)
        if (responseData)
          messageApi.open({
            type: 'success',
            content: 'Settings Updated Successfully',
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
      <Col>
      {contextHolder}
        <Row>
          <Col span={12}>
            <Row>
                <Col span={12}>
                  <Content
                      style={{
                          margin: '24px 16px',
                          padding: 24,
                          minHeight: 200,
                          background: colorBgContainer,
                          borderRadius: borderRadiusLG,
                      }}
                  >
                    
                  </Content>
                </Col>
                <Col span={12}>
                {coords ? (
                  <Card
                    title={
                          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}} > 
                            <Avatar src={weatherdata?.image} />
                            <Title type='secondary' style={{margin:0}} level={4}>{weatherdata?.text}</Title>
                          </div>
                          }
                    style={{margin:24,minHeight: 200}}
                    >   
                      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Title type='secondary' level={1}>
                          {weatherdata?.temperature} &deg;C
                        </Title>
                      </div>
                    </Card>
                ):<Card   style={{margin:24,minHeight: 200}}></Card>}
                </Col>
                <Col span={24}>
                  <Card style={{margin:'0px 16px'}}></Card>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
            <Card
                title={"Input Your Dynamic Settings"}
                style={{
                  margin: '24px 16px',
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
                  <Form.Item name={['user', 'last_night_sleep']} label="Last Night Sleep" rules={[{ required:true }]}>
                    <InputNumber suffix="Hours" style={{ width: '100%' }} placeholder="Last Night Sleep" min={0} max={18}/>
                  </Form.Item>
                  <Form.Item name={['user', 'meetings']} label="Meeting Schedule" rules={[{ required:true }]}>
                    <InputNumber suffix="Minutes" style={{ width: '100%' }} placeholder="Meeting Schedule in Minutes (Max : 480 Minutes)" min={0} max={480}/>
                  </Form.Item>
                  <Form.Item name={['user', 'urgent_tasks']} label="Urgent Tasks" rules={[{ required:true }]}>
                    <InputNumber  style={{ width: '100%' }} placeholder="Urgent Tasks (Max : 10 Tasks)" min={0} max={10}/>
                  </Form.Item>
                  <Form.Item name={['user', 'stress_level']} label="Stress Level" rules={[{ required: true }]}>
                  <Slider min={0} max={10} marks={marks} />
                  </Form.Item>
                  <Form.Item name={['user', 'physical_well_being']} label="Physical Well Being" rules={[{ required: true }]}>
                  <Slider min={0} max={10} marks={marks} />
                  </Form.Item>
                
                  <Form.Item>
                    <Button type="primary" htmlType='submit'>Submit</Button>
                  </Form.Item>
                  
                </Form>
            </Card>
            </Col>
        </Row>
        <Row>
        </Row>
      </Col>
        )
}

export default Dashboard;
