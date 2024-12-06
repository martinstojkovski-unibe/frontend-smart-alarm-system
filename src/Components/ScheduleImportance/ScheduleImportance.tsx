import React, {useEffect, useState} from "react";
import {Row,Col,theme,Card, Button, Table} from "antd";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { getSettings } from "../../Services/ApiService";
import { SwapOutlined } from '@ant-design/icons';

import Title from 'antd/es/typography/Title';



const dataSchedule = [
    { schedule: 0, low: 1, average: 0, high: 0 },
    { schedule: 3, low: 0.25, average: 0, high: 0 },
    { schedule: 4, low: 0, average: 0.5, high: 0 },
    { schedule: 5, low: 0, average: 1, high: 0 },
    { schedule: 7, low: 0, average: 0.33333333, high: 0 }, 
    { schedule: 8, low: 0, average: 0, high: 0.3333333 }, 
    { schedule: 10, low: 0, average: 0, high: 1 }, 
  ];

const dataMeetings = [
    { meetings: 0, none: 1, moderate: 0, busy: 0 },
    { meetings: 30, none: 1, moderate: 0, busy: 0 },
    { meetings: 55, none: 0.16667, moderate: 0, busy: 0 },
    { meetings: 60, none: 0, moderate: 0.07692, busy: 0 },
    { meetings: 120, none: 0, moderate: 1, busy: 0 },
    { meetings: 180, none: 0, moderate: 0.07692, busy: 0 },
    { meetings: 185, none: 0, moderate: 0, busy: 0.04167 },
    { meetings: 300, none: 0, moderate: 0, busy: 1 },
    { meetings: 480, none: 0, moderate: 0, busy: 1 },
  ];

const dataTasks = [
    { tasks: 0, low: 1, some: 0, a_lot: 0 },
    { tasks: 2, low: 0.333333, some: 0, a_lot: 0 },
    { tasks: 3, low: 0, some: 0.5, a_lot: 0 },
    { tasks: 4, low: 0, some: 1, a_lot: 0 },
    { tasks: 5, low: 0, some: 0.5, a_lot: 0 },
    { tasks: 6, low: 0, some: 0, a_lot: 0.333333 },
    { tasks: 8, low: 0, some: 0, a_lot: 1 },
    { tasks: 10, low: 0, some: 0, a_lot: 1 },
  ];


  
  const dataSource = [
    {
      key: "1",
      meeting_time: "none",
      urgent_tasks: "low",
      schedule_importance: "low"
    },
    {
      key: "2",
      meeting_time: "none",
      urgent_tasks: "some",
      schedule_importance: "low"
    },
    {
      key: "3",
      meeting_time: "none",
      urgent_tasks: "a lot",
      schedule_importance: "average"
    },
    {
      key: "4",
      meeting_time: "moderate",
      urgent_tasks: "low",
      schedule_importance: "average"
    },
    {
      key: "5",
      meeting_time: "moderate",
      urgent_tasks: "some",
      schedule_importance: "average"
    },
    {
      key: "6",
      meeting_time: "moderate",
      urgent_tasks: "a lot",
      schedule_importance: "high"
    },
    {
      key: "7",
      meeting_time: "busy",
      urgent_tasks: "low",
      schedule_importance: "average"
    },
    {
      key: "8",
      meeting_time: "busy",
      urgent_tasks: "some",
      schedule_importance: "high"
    },
    {
      key: "9",
      meeting_time: "busy",
      urgent_tasks: "a lot",
      schedule_importance: "high"
    }
  ];
  
  const columns = [
    {
      "title": "Meeting Schedule",
      "dataIndex": "meeting_time",
      "key": "meeting_time"
    },
    {
      "title": "Urgent Tasks",
      "dataIndex": "urgent_tasks",
      "key": "urgent_tasks"
    },
    {
      "title": "Schedule Importance (Output)",
      "dataIndex": "schedule_importance",
      "key": "schedule_importance"
    }
  ];








const ScheduleImportance: React.FC = () => {
    const [currentData,setCurrentData]=useState({'meetings':null,'urgent_tasks':null,'current_schedule_importance':null,'schedule_importance_out':[]});
    const [output,setOutput]= useState({membershipFunction:true})


    useEffect(() =>  {
        getSettings().then((responseData)=>{
          if(responseData)
           setCurrentData(
            { meetings:responseData.meetings,
              urgent_tasks:responseData.urgent_tasks,
              schedule_importance_out:responseData.fuzzy_outputs.map((e:any) => {return {scheduleOutput:e.schedule_importance_out,timeStamp: new Date(e.timestamp).toLocaleTimeString('en-US', { month:'short',day:'numeric',hour: 'numeric', minute: 'numeric' })}}),
              current_schedule_importance:responseData.fuzzy_outputs[responseData.fuzzy_outputs.length -1].schedule_importance_out
            }
        );
         });
    }, [])

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    return (
        <div>
            <Row>
                <Col span={12} >
                <Card 
                    title={
                    <Row style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Title style={{margin:0}} level={5}>
                        {output.membershipFunction ? 'Membership Function for Output':'Schedule Importance Output Deviation '}
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
                data={dataSchedule}
                margin={{ top: 20, right:0, left: 0, bottom: 20 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                dataKey="schedule" 
                label={{ value: 'Schedule Importance Output', position: 'insideBottom', offset: -5 }}  
                scale="linear"  
                type='number'
                tickFormatter={(tick) => `${tick}`}  />
                <YAxis domain={[0, 'auto']} label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Area type="linear" dataKey="low" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Area type="linear" dataKey="average" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                <Area type="linear" dataKey="high" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />

                {currentData.current_schedule_importance !== null && (
                    <ReferenceLine 
                        x={currentData.current_schedule_importance} 
                        stroke="red" 
                        strokeWidth="2" 
                        label={{ value: `Current: ${currentData.current_schedule_importance}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
                    />
                    )}


                    </AreaChart>:
                    <AreaChart
                    width={500}
                    height={400}
                    data={currentData.schedule_importance_out}
                    margin={{ top: 20, right:0, left: 0, bottom: 20 }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="timeStamp" 
                        label={{ value: 'Time', position: 'insideBottom', offset: -5 }}  
                        />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="scheduleOutput" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />

                    </AreaChart>
                        }
                 </Card>
                </Col>
                <Col span={12} >
                    <Card
                        title={'Membership Function for Meeting Schedule'}
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
                            data={dataMeetings}
                            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                            dataKey="meetings" 
                            label={{ value: 'Meetings Schedule', position: 'insideBottom', offset: -5 }}  
                            domain={['auto', 'auto']}
                            scale="linear"  
                            type='number'
                            tickFormatter={(tick) => `${tick}`}  />
                            <YAxis label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Area type="linear" dataKey="none" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                            <Area type="linear" dataKey="moderate" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                            <Area type="linear" dataKey="busy" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />

                            {currentData.meetings !== null && (
                            <ReferenceLine 
                                x={currentData.meetings} 
                                stroke="red" 
                                strokeWidth="2" 
                                label={{ value: `Current: ${currentData.meetings}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
                            />
                            )}

                        </AreaChart>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={12} >
                    <Card
                        title={'Membership Function for Urgent Tasks'}
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
                            data={dataTasks}
                            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                            dataKey="tasks" 
                            label={{ value: 'Urgent Tasks', position: 'insideBottom', offset: -5 }}  
                            domain={['auto', 'auto']}
                            scale="linear"  
                            type='number'
                            tickFormatter={(tick) => `${tick}`}  />
                            <YAxis label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Area type="linear" dataKey="low" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                            <Area type="linear" dataKey="some" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                            <Area type="linear" dataKey="a_lot" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />

                            {currentData.urgent_tasks !== null && (
                            <ReferenceLine 
                                x={currentData.urgent_tasks} 
                                stroke="red" 
                                strokeWidth="2" 
                                label={{ value: `Current: ${currentData.urgent_tasks}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
                            />
                            )}

                        </AreaChart>
                    </Card>
                </Col>
                </Row>
                <Col span={24}>
                    <Card
                        title={'Fuzzy Rules for Schedule Importance'}
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
    );
};

export default ScheduleImportance;