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


    const sleepMembershipAbove12 = Array.from({ length: 13 }, (_, i) => ({
        hours: i,
        little: Math.max(0, 1 - i / 3),
        average: i <= 3 ? 0 : i <= 7 ? (i - 3) / 4 : Math.max(0, (9 - i) / 2),
        high: i <= 9 ? 0 : Math.min(1, (i - 9) / 3),
    }));

    const sleepMembershipBelow12 = Array.from({ length: 16 }, (_, i) => ({
        hours: i,
        little: Math.max(0, 1 - i / 5),
        average: i <= 5 ? 0 : i <= 10 ? (i - 5) / 5 : Math.max(0, (12 - i) / 2),
        high: i <= 12 ? 0 : Math.min(1, (i - 12) / 3),
    }));

    const debtMembershipData = Array.from({ length: 31 }, (_, i) => ({
        hours: i,
        low: Math.max(0, 1 - i / 5),
        average: i <= 5 ? 0 : i <= 15 ? (i - 5) / 10 : Math.max(0, (20 - i) / 5),
        high: i <= 15 ? 0 : Math.min(1, (i - 15) / 15),
    }));
    // Membership functions
    const sleepLittleAbove12 = (x: number) => x <= 1 ? 1 : x <= 3 ? (3 - x) / 2 : 0;
    const sleepAverageAbove12 = (x: number) => x <= 3 ? 0 : x <= 7 ? (x - 3) / 4 : x <= 9 ? (9 - x) / 2 : 0;
    const sleepHighAbove12 = (x: number) => (x <= 9 ? 0 : x <= 12 ? (x - 9) / 3 : 1);

    const sleepLittleBelow12 = (x: number) => x <= 3 ? 1 : x <= 5 ? (5 - x) / 2 : 0;
    const sleepAverageBelow12 = (x: number) => x <= 5 ? 0 : x <= 10 ? (x - 5) / 5 : x <= 12 ? (12 - x) / 2 : 0;
    const sleepHighBelow12 = (x: number) => (x <= 12 ? 0 : x <= 15 ? (x - 12) / 3 : 1);

    const debtLow = (x: number) => (x <= 3 ? 1 : x <= 5 ? (5 - x) / 2 : 0);
    const debtAverage = (x: number) => x <= 5 ? 0 : x <= 7 ? (x - 5) / 2 : x <= 15 ? (15 - x) / 8 : 0;
    const debtHigh = (x: number) => (x <= 15 ? 0 : x <= 30 ? (x - 15) / 15 : 1);


    // Fuzzy membership functions for Physical Well-Being
    const sick = (x: number) => (x <= 3 ? 1 : x <= 4 ? (4 - x) / 1 : 0);
    const neutral = (x: number) =>
        x <= 3 ? 0 : x <= 6 ? (x - 3) / 3 : x <= 7 ? (7 - x) / 1 : 0;
    const healthy = (x: number) => (x <= 6 ? 0 : x <= 10 ? (x - 6) / 4 : 1);

    const membershipData = Array.from({ length: 101 }, (_, i) => {
        const x = i / 10; // Increment by 0.1
        return {
            x,
            sick: sick(x),
            neutral: neutral(x),
            healthy: healthy(x),
        };
    });

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
