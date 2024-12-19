import React ,{useEffect, useState} from 'react';
import {  Layout, theme ,Slider, SliderSingleProps, Col, Row, Button, Card,Typography,Avatar,Form ,InputNumber,message, Table} from 'antd';
import { useGeolocated } from "react-geolocated";
import { getSettings, updateSettings } from '../../Services/ApiService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { FieldTimeOutlined, SwapOutlined } from '@ant-design/icons';
import Column from 'antd/es/table/Column';




const { Title } = Typography;
const { Content } = Layout;

const dataAlarm = [
  { alarm: -60, delay: 1, no_change: 0, advance: 0 },
  { alarm: -15, delay: 0.25, no_change: 0, advance: 0 },
  { alarm: 0, delay: 0, no_change: 1, advance: 0 },
  { alarm: 15, delay: 0, no_change: 0, advance: 0.25 },
  { alarm: 60, delay: 0, no_change: 0, advance: 1 }

];


const dataSource = [
  {
    "key": "1",
    "sleep_quality": "poor",
    "schedule_importance": "high",
    "physical_well_being": "-",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "no_change"
  },
  {
    "key": "2",
    "sleep_quality": "poor",
    "schedule_importance": "medium",
    "physical_well_being": "-",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "advance"
  },
  {
    "key": "3",
    "sleep_quality": "poor",
    "schedule_importance": "low",
    "physical_well_being": "-",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "advance"
  },
  {
    "key": "4",
    "sleep_quality": "average",
    "schedule_importance": "high",
    "physical_well_being": "-",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "no_change"
  },
  {
    "key": "5",
    "sleep_quality": "average",
    "schedule_importance": "medium",
    "physical_well_being": "-",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "no_change"
  },
  {
    "key": "6",
    "sleep_quality": "average",
    "schedule_importance": "low",
    "physical_well_being": "-",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "advance"
  },
  {
    "key": "7",
    "sleep_quality": "good",
    "schedule_importance": "high",
    "physical_well_being": "-",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "delay"
  },
  {
    "key": "8",
    "sleep_quality": "good",
    "schedule_importance": "medium",
    "physical_well_being": "-",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "no_change"
  },
  {
    "key": "9",
    "sleep_quality": "good",
    "schedule_importance": "low",
    "physical_well_being": "-",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "no_change"
  },
  {
    "key": "10",
    "sleep_quality": "-",
    "schedule_importance": "high",
    "physical_well_being": "sick",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "no_change"
  },
  {
    "key": "11",
    "sleep_quality": "-",
    "schedule_importance": "medium",
    "physical_well_being": "sick",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "advance"
  },
  {
    "key": "12",
    "sleep_quality": "good",
    "schedule_importance": "-",
    "physical_well_being": "healthy",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "delay"
  },
  {
    "key": "13",
    "sleep_quality": "poor",
    "schedule_importance": "-",
    "physical_well_being": "healthy",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "advance"
  },
  {
    "key": "14",
    "sleep_quality": "average",
    "schedule_importance": "-",
    "physical_well_being": "neutral",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "no_change"
  },
  {
    "key": "15",
    "sleep_quality": "-",
    "schedule_importance": "high",
    "physical_well_being": "-",
    "fatigue_level": "-",
    "weather": "bad",
    "wake_time_adjustment": "no_change"
  },
  {
    "key": "16",
    "sleep_quality": "-",
    "schedule_importance": "-",
    "physical_well_being": "healthy",
    "fatigue_level": "-",
    "weather": "good",
    "wake_time_adjustment": "delay"
  },
  {
    "key": "17",
    "sleep_quality": "-",
    "schedule_importance": "-",
    "physical_well_being": "sick",
    "fatigue_level": "-",
    "weather": "average",
    "wake_time_adjustment": "advance"
  },
  {
    "key": "18",
    "sleep_quality": "good",
    "schedule_importance": "-",
    "physical_well_being": "-",
    "fatigue_level": "-",
    "weather": "good",
    "wake_time_adjustment": "delay"
  },
  {
    "key": "19",
    "sleep_quality": "poor",
    "schedule_importance": "-",
    "physical_well_being": "neutral",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "advance"
  },
  {
    "key": "20",
    "sleep_quality": "-",
    "schedule_importance": "low",
    "physical_well_being": "healthy",
    "fatigue_level": "-",
    "weather": "-",
    "wake_time_adjustment": "advance"
  },
  {
    "key": "21",
    "sleep_quality": "-",
    "schedule_importance": "low",
    "physical_well_being": "-",
    "fatigue_level": "low",
    "weather": "-",
    "wake_time_adjustment": "no_change"
  },
  {
    "key": "22",
    "sleep_quality": "-",
    "schedule_importance": "medium",
    "physical_well_being": "-",
    "fatigue_level": "low",
    "weather": "-",
    "wake_time_adjustment": "no_change"
  },
  {
    "key": "23",
    "sleep_quality": "-",
    "schedule_importance": "high",
    "physical_well_being": "-",
    "fatigue_level": "low",
    "weather": "-",
    "wake_time_adjustment": "delay"
  },
  {
    "key": "24",
    "sleep_quality": "poor",
    "schedule_importance": "-",
    "physical_well_being": "-",
    "fatigue_level": "average",
    "weather": "-",
    "wake_time_adjustment": "advance"
  }
]

const columns = [
  {
    "title": "Sleep Quality",
    "dataIndex": "sleep_quality",
    "key": "sleep_quality"
  },
  {
    "title": "Schedule Importance",
    "dataIndex": "schedule_importance",
    "key": "schedule_importance"
  },
  {
    "title": "Physical Well-Being",
    "dataIndex": "physical_well_being",
    "key": "physical_well_being"
  },
  {
    "title": "Fatigue Level",
    "dataIndex": "fatigue_level",
    "key": "fatigue_level"
  },
  {
    "title": "Weather",
    "dataIndex": "weather",
    "key": "weather"
  },
  {
    "title": "Wake Time Adjustment (Output)",
    "dataIndex": "wake_time_adjustment",
    "key": "wake_time_adjustment"
  }
]


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

    const [alarm,setAlarm] = useState<string>()

 

    const [weatherdata,setWeatherData]=useState({text:'',image:'',temperature:0.0})

    const [currentData,setCurrentData]=useState({'current_adjustment':120,'wake_time_adjustment':[]})

    const [output,setOutput]= useState({membershipFunction:true})

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
      if(currentData.current_adjustment !== 120 && user_id){
        const adjustment =new Date (new Date(new Date().setHours(new Date().getHours() + 7)).setMinutes(new Date().getMinutes()+Math.round(currentData.current_adjustment)) )
        const alarmm = new Date(adjustment).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric'})
        setAlarm(alarmm)
      }
     
    },[currentData.current_adjustment])

    useEffect(()=>{
      if(coords){
        fetch(`https://api.weatherapi.com/v1/current.json?key=3856be57b9a24d88895140604242211&q=${coords?.latitude},${coords?.longitude}&aqi=no`)
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
          setCurrentData(
            {
              wake_time_adjustment:responseData.fuzzy_outputs.map((e:any) => {return {output:e.wake_time_adjustment,timeStamp: new Date(e.timestamp).toLocaleTimeString('en-US', { month:'short',day:'numeric',hour: 'numeric', minute: 'numeric' })}}),
              current_adjustment:responseData.fuzzy_outputs[responseData.fuzzy_outputs.length -1].wake_time_adjustment
            })
          messageApi.open({
            type: 'success',
            content: 'Settings Updated Successfully',
          });
      }
    }

    useEffect(() =>  {
      if(user_id){
        getSettings().then((responseData)=>{
          if(responseData)
            form.setFieldsValue({user:responseData})
          if(responseData.fuzzy_outputs.length !==0){
            setCurrentData(
              {
                wake_time_adjustment:responseData.fuzzy_outputs.map((e:any) => {return {output:e.wake_time_adjustment,timeStamp: new Date(e.timestamp).toLocaleTimeString('en-US', { month:'short',day:'numeric',hour: 'numeric', minute: 'numeric' })}}),
                current_adjustment:responseData.fuzzy_outputs[responseData.fuzzy_outputs.length -1].wake_time_adjustment
              })
          }
          
         });
      }
      
    }, [form])
    
    
 
    return(
      <Col>
      {contextHolder}
        <Row>
          <Col span={12}>
            <Row>
                <Col span={12}>
                <Card
                    title={
                          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}} > 
                            <FieldTimeOutlined style={{color:'grey'}}/>
                            <Title type='secondary' style={{margin:5}} level={4}>Alarm Time</Title>
                          </div>
                          }
                    style={{margin:'24px 16px',minHeight: 200}}
                    >   
                      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Col>
                          <Title type='secondary' level={1}>
                            {alarm?alarm:''}
                          </Title>
                          <Title type='secondary' level={5}>
                            {currentData.current_adjustment!==120?`Current Wake Time Adjustment : ${Math.round(currentData.current_adjustment)} Minutes`:''}
                          </Title>
                        </Col>
                        
                      </div>
                    </Card>
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
                <Card 
                    title={
                    <Row style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <Title style={{margin:0}} level={5}>
                        {output.membershipFunction ? 'Membership Function for Output':'Output Deviation '}
                      </Title>
                      <Button onClick={()=> setOutput({membershipFunction : !output.membershipFunction})} type='link' icon={<SwapOutlined />}>Switch Graphs </Button>
                    </Row>}
                    style={{
                          margin: '0px 16px',
                          minHeight: 280,
                          background: colorBgContainer,
                          borderRadius: borderRadiusLG,
                      }}
                  >
                {output.membershipFunction?
                <AreaChart
                width={500}
                height={400}
                data={dataAlarm}
                margin={{ top: 20, right:0, left: 0, bottom: 20 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="alarm" 
                  label={{ value: 'Wake Time Adjustment Output', position: 'insideBottom', offset: -5 }}  
                  scale="linear"  
                  type='number'
                  tickFormatter={(tick) => `${tick}`}  />
                <YAxis domain={[0, 'auto']} label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Area type="linear" dataKey="delay" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Area type="linear" dataKey="no_change" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                <Area type="linear" dataKey="advance" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />

                {currentData.current_adjustment !== 120 && (
                      <ReferenceLine 
                        x={currentData.current_adjustment} 
                        stroke="red" 
                        strokeWidth="2" 
                        label={{ value: `Current: ${currentData.current_adjustment}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
                      />
                    )}


              </AreaChart>:
              <AreaChart
              width={500}
              height={400}
              data={currentData.wake_time_adjustment}
              margin={{ top: 20, right:0, left: 0, bottom: 20 }}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timeStamp" 
                label={{ value: 'Time', position: 'insideBottom', offset: -5 }}  
                  />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="output" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />

            </AreaChart>
                }
                </Card>
                </Col>
              </Row>
          
            </Col>
            <Col span={12}>
            <Card
                title={"Input Your Dynamic Settings"}
                style={{
                  margin: '24px 16px',
                  minHeight: 250,
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
        <Col span={24}>
        <Card
            title={'Fuzzy Rules for Wake Tme Adjustment '}
            style={{
                margin: '24px 16px',
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
          <Table dataSource={dataSource} columns={columns} />;
        </Card>
        </Col>  
        </Row>
      </Col>
        )
}

export default Dashboard;
