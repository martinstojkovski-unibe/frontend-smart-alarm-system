import React, { useEffect, useState } from 'react';
import {  Table, theme , Col, Card, Row, Tabs, Button, Typography} from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { getSettings } from '../../Services/ApiService';
import { SwapOutlined } from '@ant-design/icons';

const { Title } = Typography;

const dataSleepDebt = [
  { sleep_debt: 0, low: 1, average: 0, high: 0 },
  { sleep_debt: 3, low: 1, average: 0, high: 0 },
  { sleep_debt: 5, low: 0.5, average: 1, high: 0.16667 },
  { sleep_debt: 7, low: 0, average: 0, high: 0.333333 },
  { sleep_debt: 15, low: 0, average: 0, high: 1 },
  { sleep_debt: 30, low: 0, average: 0, high: 1 },
 
];
const dataLastNight1 = [
  { last_night: 0, little: 1, average: 0, high: 0 },
  { last_night: 1, little: 1, average: 0, high: 0 },
  { last_night: 3, little: 0.333333, average: 0, high: 0 },
  { last_night: 4, little: 0, average: 0.25, high: 0 },
  { last_night: 7, little: 0, average: 1, high: 0 },
  { last_night: 8, little: 0, average: 0.5, high: 0 },
  { last_night: 9, little: 0, average: 0, high: 0.25 },
  { last_night: 12, little: 0, average: 0, high: 1 },
  { last_night: 16, little: 0, average: 0, high: 1 },
];

const dataLastNight2 = [
  { last_night: 0, little: 1, average: 0, high: 0 },
  { last_night: 3, little: 1, average: 0, high: 0 },
  { last_night: 5, little: 0.333333, average: 0, high: 0 },
  { last_night: 6, little: 0, average: 0.2, high: 0 },
  { last_night: 10, little: 0, average: 1, high: 0 },
  { last_night: 11, little: 0, average: 0.5, high: 0 },
  { last_night: 12, little: 0, average: 0, high: 0.25 },
  { last_night: 15, little: 0, average: 0, high: 1 },
  { last_night: 18, little: 0, average: 0, high: 1 },
];


const dataFatigue = [
  { fatigue: 0, low: 1, average: 0, high: 0 },
  { fatigue: 2, low: 0.333333, average: 0, high: 0 },
  { fatigue: 3, low: 0, average: 0.333333, high: 0 },
  { fatigue: 5, low: 0, average: 1, high: 0 },
  { fatigue: 8, low: 0, average: 0, high: 0.6 },
  { fatigue: 10, low: 0, average: 0, high: 1 },
 
];

const dataSource = [
  {
    "key": "1",
    "last_night_sleep": "little",
    "sleep_debt": "low",
    "fatigue_level": "average"
  },
  {
    "key": "2",
    "last_night_sleep": "little",
    "sleep_debt": "average",
    "fatigue_level": "average"
  },
  {
    "key": "3",
    "last_night_sleep": "little",
    "sleep_debt": "high",
    "fatigue_level": "high"
  },
  {
    "key": "4",
    "last_night_sleep": "average",
    "sleep_debt": "low",
    "fatigue_level": "low"
  },
  {
    "key": "5",
    "last_night_sleep": "average",
    "sleep_debt": "average",
    "fatigue_level": "average"
  },
  {
    "key": "6",
    "last_night_sleep": "average",
    "sleep_debt": "high",
    "fatigue_level": "high"
  },
  {
    "key": "7",
    "last_night_sleep": "high",
    "sleep_debt": "low",
    "fatigue_level": "low"
  },
  {
    "key": "8",
    "last_night_sleep": "high",
    "sleep_debt": "average",
    "fatigue_level": "low"
  },
  {
    "key": "9",
    "last_night_sleep": "high",
    "sleep_debt": "high",
    "fatigue_level": "average"
  }
]

const columns =[
  {
    "title": "Last Night Sleep",
    "dataIndex": "last_night_sleep",
    "key": "last_night_sleep"
  },
  {
    "title": "Sleep Debt",
    "dataIndex": "sleep_debt",
    "key": "sleep_debt"
  },
  {
    "title": "Fatigue Level (Output)",
    "dataIndex": "fatigue_level",
    "key": "fatigue_level"
  }
]


const FatigueLevel: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

const [currentData,setCurrentData]=useState({'user_age':null,'last_night_sleep':null,'sleep_debt':null,'current_fatigue':null,'fatigue_level_out':[]})

const [output,setOutput]= useState({membershipFunction:true})

useEffect(() =>  {
    getSettings().then((responseData)=>{
      if(responseData)
       setCurrentData(
        { user_age:responseData.user_age,
          last_night_sleep:responseData.last_night_sleep,
          sleep_debt:responseData.sleep_debt,
          fatigue_level_out :responseData.fuzzy_outputs.map((e:any) => {return {fatigueOutput:e.fatigue_level_out,timeStamp: new Date(e.timestamp).toLocaleTimeString('en-US', { month:'short',day:'numeric',hour: 'numeric', minute: 'numeric' })}}),
          current_fatigue:responseData.fuzzy_outputs[responseData.fuzzy_outputs.length -1].fatigue_level_out
        }
    );
     });
}, [])

return(
  <div>
    <Row>
    <Col span={12} >
      <Card 
        title={
        <Row style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <Title style={{margin:0}} level={5}>
            {output.membershipFunction ? 'Membership Function for Fatigue Level Output':'Fatigue Level Output Deviation '}
          </Title>
          <Button onClick={()=> setOutput({membershipFunction : !output.membershipFunction})} type='link' icon={<SwapOutlined />}>Switch Graphs </Button>
        </Row>}
        style={{
              margin: '24px 16px',
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
          }}
      >
     {output.membershipFunction?
     <AreaChart
     width={500}
     height={400}
     data={dataFatigue}
     margin={{ top: 20, right:0, left: 0, bottom: 20 }}
     >
     <CartesianGrid strokeDasharray="3 3" />
     <XAxis 
       dataKey="fatigue" 
       label={{ value: 'Fatigue Level Output', position: 'insideBottom', offset: -5 }}  
       scale="linear"  
       type='number'
       tickFormatter={(tick) => `${tick}`}  />
     <YAxis domain={[0, 'auto']} label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
     <Tooltip />
     <Legend />
     <Area type="linear" dataKey="low" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
     <Area type="linear" dataKey="average" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
     <Area type="linear" dataKey="high" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />

     {currentData.current_fatigue !== null && (
          <ReferenceLine 
            x={currentData.current_fatigue} 
            stroke="red" 
            strokeWidth="2" 
            label={{ value: `Current: ${currentData.current_fatigue}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
          />
        )}


   </AreaChart>:
   <AreaChart
   width={500}
   height={400}
   data={currentData.fatigue_level_out}
   margin={{ top: 20, right:0, left: 0, bottom: 20 }}
   >
   <CartesianGrid strokeDasharray="3 3" />
   <XAxis 
     dataKey="timeStamp" 
     label={{ value: 'Time', position: 'insideBottom', offset: -5 }}  
      />
   <YAxis />
   <Tooltip />
   <Area type="monotone" dataKey="fatigueOutput" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />

 </AreaChart>
     }
    </Card>
    </Col>
    <Col span={12} >
      <Card
          title={'Membership Function for Sleep Debt'}
          style={{
              margin: '24px 16px',
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
          }}
      >
      <AreaChart
        width={500}
        height={400}
        data={dataSleepDebt}
        margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="sleep_debt" 
          label={{ value: 'Sleep Debt', position: 'insideBottom', offset: -5 }}  
          domain={['auto', 'auto']}
          scale="linear"  
          type='number'
          tickFormatter={(tick) => `${tick}`}  />
        <YAxis label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Area type="linear" dataKey="low" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        <Area type="linear" dataKey="average" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
        <Area type="linear" dataKey="high" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />

        {currentData.sleep_debt !== null && (
          <ReferenceLine 
            x={currentData.sleep_debt} 
            stroke="red" 
            strokeWidth="2" 
            label={{ value: `Current: ${currentData.sleep_debt}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
          />
        )}

      </AreaChart>
      </Card>
    </Col>
    </Row>
    <Row>
    <Col span={12}>
    <Card
          title={'Membership Function for Last Night Sleep (12 y. up)'}
          style={{
              margin: '24px 16px',
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
          }}
      >
        <AreaChart
        width={500}
        height={400}
        data={dataLastNight1}
        margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="last_night" 
          label={{ value: 'Last Night Sleep', position: 'insideBottom', offset: -5 }}  
          domain={['auto', 'auto']}
          scale="linear"  
          type='number'
          tickFormatter={(tick) => `${tick}`}  />
        <YAxis label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Area type="linear" dataKey="little" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        <Area type="linear" dataKey="average" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
        <Area type="linear" dataKey="high" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />

        {currentData.user_age !== null && currentData.user_age >12 && currentData.last_night_sleep !== null && (
          <ReferenceLine 
            x={currentData.last_night_sleep} 
            stroke="red" 
            strokeWidth="2" 
            label={{ value: `Current: ${currentData.last_night_sleep}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
          />
        )}

      </AreaChart>
      </Card>
    </Col>
    <Col span={12}>
      <Card
          title={'Membership Function for Last Night Sleep (12 y. down)'}
          style={{
              margin: '24px 16px',
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
          }}
      >
        <AreaChart
        width={500}
        height={400}
        data={dataLastNight2}
        margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="last_night" 
          label={{ value: 'Last Night Sleep', position: 'insideBottom', offset: -5 }}  
          domain={['auto', 'auto']}
          scale="linear"  
          type='number'
          tickFormatter={(tick) => `${tick}`}  />
        <YAxis label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Area type="linear" dataKey="little" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        <Area type="linear" dataKey="average" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
        <Area type="linear" dataKey="high" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />

        {currentData.user_age !== null && currentData.user_age < 12 && currentData.last_night_sleep !== null && (
          <ReferenceLine 
            x={currentData.last_night_sleep} 
            stroke="red" 
            strokeWidth="2" 
            label={{ value: `Current: ${currentData.last_night_sleep}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
          />
        )}
      </AreaChart>
      </Card>
    </Col>
    </Row>
    <Col span={24}>
    <Card
        title={'Fuzzy Rules for Fatigue Level '}
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
            
    </div>
    )
};

export default FatigueLevel;