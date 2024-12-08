import React, { useEffect, useState } from 'react';
import {  Table, theme , Col, Card, Row, Button, Typography} from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { getSettings } from '../../Services/ApiService';
import { SwapOutlined } from '@ant-design/icons';

const { Title } = Typography;

const dataAmbientNoise = [
    { ambient_noise: 0, low: 1, average: 0, high: 0 },
    { ambient_noise: 2, low: 1, average: 0, high: 0 },
    { ambient_noise: 3, low: 0.5, average: 0, high: 0 },
    { ambient_noise: 4, low: 0, average: 0.5, high: 0 },
    { ambient_noise: 5, low: 0, average: 1, high: 0 },
    { ambient_noise: 6, low: 0, average: 0.666667, high: 0 },
    { ambient_noise: 8, low: 0, average: 0, high: 1 },
    { ambient_noise: 10, low: 0, average: 0, high: 1 },
  ];


  const dataBedQuality = [
    { bed_quality: 0, poor: 1, average: 0, good: 0 },
    { bed_quality: 1, poor: 0.5, average: 0, good: 0 },
    { bed_quality: 2, poor: 0, average: 0.5, good: 0 },
    { bed_quality: 3, poor: 0, average: 1, good: 0 },
    { bed_quality: 5, poor: 0, average: 0.333333, good: 0 },
    { bed_quality: 6, poor: 0, average: 0, good: 0.2 },
    { bed_quality: 10, poor: 0, average: 0, good: 1 },
  ];

  const dataStressLevel = [
    { stress_level: 0, low: 1, average: 0, high: 0 },
    { stress_level: 2, low: 0.333333, average: 0, high: 0 },
    { stress_level: 3, low: 0, average: 0.5, high: 0 },
    { stress_level: 4, low: 0, average: 1, high: 0 },
    { stress_level: 6, low: 0, average: 1, high: 0 },
    { stress_level: 7, low: 0, average: 0.5, high: 0 },
    { stress_level: 8, low: 0, average: 0, high: 0.333333 },
    { stress_level: 10, low: 0, average: 0, high: 1 },
    
  ];

  

  const dataSleepQuality = [
    { sleepQuality: 0, poor: 1, average: 0, good: 0 },
    { sleepQuality: 3, poor: 0.4, average: 0, good: 0 },
    { sleepQuality: 5, poor: 0, average: 1, good: 0 },
    { sleepQuality: 8, poor: 0, average: 0, good: 0.6 },
    { sleepQuality: 10, poor: 0, average: 0, good: 1  },
  ];

const dataSource = [
  {
    "key": "1",
    "ambient_noise": "low",
    "bed_quality": "poor",
    "stress_level": "-",
    "sleep_quality_output": "average"
  },
  {
    "key": "2",
    "ambient_noise": "low",
    "bed_quality": "average",
    "stress_level": "-",
    "sleep_quality_output": "average"
  },
  {
    "key": "3",
    "ambient_noise": "low",
    "bed_quality": "good",
    "stress_level": "-",
    "sleep_quality_output": "good"
  },
  {
    "key": "4",
    "ambient_noise": "average",
    "bed_quality": "poor",
    "stress_level": "-",
    "sleep_quality_output": "poor"
  },
  {
    "key": "5",
    "ambient_noise": "average",
    "bed_quality": "average",
    "stress_level": "-",
    "sleep_quality_output": "average"
  },
  {
    "key": "6",
    "ambient_noise": "average",
    "bed_quality": "good",
    "stress_level": "-",
    "sleep_quality_output": "good"
  },
  {
    "key": "7",
    "ambient_noise": "high",
    "bed_quality": "poor",
    "stress_level": "-",
    "sleep_quality_output": "poor"
  },
  {
    "key": "8",
    "ambient_noise": "high",
    "bed_quality": "average",
    "stress_level": "-",
    "sleep_quality_output": "average"
  },
  {
    "key": "9",
    "ambient_noise": "high",
    "bed_quality": "good",
    "stress_level": "-",
    "sleep_quality_output": "average"
  },
  {
    "key": "10",
    "ambient_noise": "low",
    "bed_quality": "-",
    "stress_level": "low",
    "sleep_quality_output": "good"
  },
  {
    "key": "11",
    "ambient_noise": "low",
    "bed_quality": "-",
    "stress_level": "average",
    "sleep_quality_output": "good"
  },
  {
    "key": "12",
    "ambient_noise": "low",
    "bed_quality": "-",
    "stress_level": "high",
    "sleep_quality_output": "average"
  },
  {
    "key": "13",
    "ambient_noise": "average",
    "bed_quality": "-",
    "stress_level": "low",
    "sleep_quality_output": "good"
  },
  {
    "key": "14",
    "ambient_noise": "average",
    "bed_quality": "-",
    "stress_level": "average",
    "sleep_quality_output": "average"
  },
  {
    "key": "15",
    "ambient_noise": "average",
    "bed_quality": "-",
    "stress_level": "high",
    "sleep_quality_output": "average"
  },
  {
    "key": "16",
    "ambient_noise": "high",
    "bed_quality": "-",
    "stress_level": "low",
    "sleep_quality_output": "average"
  },
  {
    "key": "17",
    "ambient_noise": "high",
    "bed_quality": "-",
    "stress_level": "average",
    "sleep_quality_output": "average"
  },
  {
    "key": "18",
    "ambient_noise": "high",
    "bed_quality": "-",
    "stress_level": "high",
    "sleep_quality_output": "poor"
  },
  {
    "key": "19",
    "ambient_noise": "-",
    "bed_quality": "poor",
    "stress_level": "low",
    "sleep_quality_output": "average"
  },
  {
    "key": "20",
    "ambient_noise": "-",
    "bed_quality": "poor",
    "stress_level": "average",
    "sleep_quality_output": "average"
  },
  {
    "key": "21",
    "ambient_noise": "-",
    "bed_quality": "poor",
    "stress_level": "high",
    "sleep_quality_output": "poor"
  },
  {
    "key": "22",
    "ambient_noise": "-",
    "bed_quality": "average",
    "stress_level": "low",
    "sleep_quality_output": "average"
  },
  {
    "key": "23",
    "ambient_noise": "-",
    "bed_quality": "average",
    "stress_level": "average",
    "sleep_quality_output": "average"
  },
  {
    "key": "24",
    "ambient_noise": "-",
    "bed_quality": "average",
    "stress_level": "high",
    "sleep_quality_output": "good"
  },
  {
    "key": "25",
    "ambient_noise": "-",
    "bed_quality": "good",
    "stress_level": "low",
    "sleep_quality_output": "poor"
  },
  {
    "key": "26",
    "ambient_noise": "-",
    "bed_quality": "good",
    "stress_level": "average",
    "sleep_quality_output": "average"
  },
  {
    "key": "27",
    "ambient_noise": "-",
    "bed_quality": "good",
    "stress_level": "high",
    "sleep_quality_output": "average"
  }
]
  const columns = [
    {
      "title": "Ambient Noise",
      "dataIndex": "ambient_noise",
      "key": "ambient_noise"
    },
    {
      "title": "Bed Quality",
      "dataIndex": "bed_quality",
      "key": "bed_quality"
    },
    {
      "title": "Stress Level",
      "dataIndex": "stress_level",
      "key": "stress_level"
    },
    {
      "title": "Sleep Quality Output",
      "dataIndex": "sleep_quality_output",
      "key": "sleep_quality_output"
    }
  ]

const SleepQuality: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    const [currentData,setCurrentData]=useState({'stress_level':null,'bed_quality':null,'ambient_noise':null,'current_sleep_quality':null,'sleep_quality_out':[]})

    const [output,setOutput]= useState({membershipFunction:true})

    useEffect(() =>  {
        getSettings().then((responseData)=>{
          if(responseData)
           setCurrentData(
            { stress_level:responseData.stress_level,
              bed_quality:responseData.bed_quality,
              ambient_noise:responseData.ambient_noise,
              sleep_quality_out:responseData.fuzzy_outputs.map((e:any) => {return {sleepQualityOutput:e.sleep_quality_out,timeStamp: new Date(e.timestamp).toLocaleTimeString('en-US', { month:'short',day:'numeric',hour: 'numeric', minute: 'numeric' })}}),
              current_sleep_quality:responseData.fuzzy_outputs[responseData.fuzzy_outputs.length -1].sleep_quality_out
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
                {output.membershipFunction ? 'Membership Function for Sleep Quality Output':'Sleep Quality Output Deviation '}
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
         data={dataSleepQuality}
         margin={{ top: 20, right:0, left: 0, bottom: 20 }}
         >
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis 
           dataKey="sleepQuality" 
           label={{ value: 'Sleep Quality Output', position: 'insideBottom', offset: -5 }}  
           scale="linear"  
           type='number'
           tickFormatter={(tick) => `${tick}`}  />
         <YAxis domain={[0, 'auto']} label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
         <Tooltip />
         <Legend />
         <Area type="linear" dataKey="poor" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
         <Area type="linear" dataKey="average" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
         <Area type="linear" dataKey="good" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />

         {currentData.current_sleep_quality !== null && (
              <ReferenceLine 
                x={currentData.current_sleep_quality} 
                stroke="red" 
                strokeWidth="2" 
                label={{ value: `Current: ${currentData.current_sleep_quality}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
              />
            )}


       </AreaChart>:
       <AreaChart
       width={500}
       height={400}
       data={currentData.sleep_quality_out}
       margin={{ top: 20, right:0, left: 0, bottom: 20 }}
       >
       <CartesianGrid strokeDasharray="3 3" />
       <XAxis 
         dataKey="timeStamp" 
         label={{ value: 'Time', position: 'insideBottom', offset: -5 }}  
          />
       <YAxis />
       <Tooltip />
       <Area type="monotone" dataKey="sleepQualityOutput" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />

     </AreaChart>
         }
        </Card>
        </Col>
        <Col span={12} >
          <Card
              title={'Membership Function for Ambient Noise'}
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
            data={dataAmbientNoise}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="ambient_noise" 
              label={{ value: 'Ambient Noise', position: 'insideBottom', offset: -5 }}  
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

            {currentData.ambient_noise !== null && (
              <ReferenceLine 
                x={currentData.ambient_noise} 
                stroke="red" 
                strokeWidth="2" 
                label={{ value: `Current: ${currentData.ambient_noise}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
              />
            )}

          </AreaChart>
          </Card>
        </Col>
        </Row>
        <Row>
        <Col span={12}>
        <Card
              title={'Membership Function for Bed Quality'}
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
            data={dataBedQuality}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="bed_quality" 
              label={{ value: 'Bed Quality', position: 'insideBottom', offset: -5 }}  
              domain={['auto', 'auto']}
              scale="linear"  
              type='number'
              tickFormatter={(tick) => `${tick}`}  />
            <YAxis label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Area type="linear" dataKey="poor" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            <Area type="linear" dataKey="average" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
            <Area type="linear" dataKey="good" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />

            {currentData.bed_quality !== null && (
              <ReferenceLine 
                x={currentData.bed_quality} 
                stroke="red" 
                strokeWidth="2" 
                label={{ value: `Current: ${currentData.bed_quality}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
              />
            )}

          </AreaChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card
              title={'Membership Function for Stress Level'}
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
            data={dataStressLevel}
            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="stress_level" 
              label={{ value: 'Stress Level', position: 'insideBottom', offset: -5 }}  
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
            {currentData.stress_level !== null && (
              <ReferenceLine 
                x={currentData.stress_level} 
                stroke="red" 
                strokeWidth="2" 
                label={{ value: `Current: ${currentData.stress_level}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
              />
            )}
          </AreaChart>
          </Card>
        </Col>
        </Row>
        <Col span={24}>
        <Card
            title={'Fuzzy Rules for Sleep Quality '}
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

export default SleepQuality;