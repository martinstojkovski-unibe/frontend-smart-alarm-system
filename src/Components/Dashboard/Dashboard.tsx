import React ,{useEffect, useState} from 'react';
import {  Layout, theme ,Slider, SliderSingleProps, Col, Row, Button, Card,Typography,Avatar,Form ,InputNumber} from 'antd';
import { useGeolocated } from "react-geolocated";


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

function Dashboard() {
    const [form] = Form.useForm();

   const [weatherdata,setWeatherData]=useState({text:'',image:'',temperature:''})

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    const [data, setData] = useState({sleep_quality:0,schedule_importance:0,mood:0,weather:0,preferred_wake_method:0});

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
            setWeatherData({text: data?.current?.condition?.text,image:data?.current?.condition?.icon,temperature:data?.current?.temp_c})
          }  
        })
      }
      
    },[coords])

    console.log(weatherdata)

    const handleChange = (name:string, value:number) => {
      setData({ ...data, [name]: value }); 
     };

     const submitValues = async ()=>{
      try {
        const response = await fetch("http://127.0.0.1:8000/hello/alarm/",{
          method:"POST",
          headers:{
            'Content-Type':'application/json'

          },
          body:JSON.stringify(data)
        })
  
        const responseData = await response.json();
        console.log(responseData);
  
      } catch (error) {
        console.log(error)
      }
     
    }
    
 
    return(
       <Row>
          <Col span={6}>
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
          <Col span={6}>
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
                onFinish={()=>{}}
                validateMessages={validateMessages}
              >
                <Form.Item name={['user', 'last_night_sleep']} label="Last Night Sleep" rules={[{ required:true }]}>
                  <InputNumber suffix="Hours" style={{ width: '100%' }} placeholder="Last Night Sleep" min={0} max={18}/>
                </Form.Item>
                <Form.Item name={['user', 'meeting']} label="Meeting Schedule" rules={[{ required:true }]}>
                  <InputNumber suffix="Minutes" style={{ width: '100%' }} placeholder="Meeting Schedule in Minutes" min={0} max={480}/>
                </Form.Item>
                <Form.Item name={['user', 'urgent_tasks']} label="Urgent Tasks" rules={[{ required:true }]}>
                  <InputNumber  style={{ width: '100%' }} placeholder="Urgent Tasks" min={0} max={10}/>
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
        )
}

export default Dashboard;
