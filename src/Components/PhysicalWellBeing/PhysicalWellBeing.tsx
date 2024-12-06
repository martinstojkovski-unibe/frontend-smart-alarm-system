import React, {useEffect, useState} from "react";
import {Row,Col,theme,Card} from "antd";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { getSettings } from "../../Services/ApiService";


const dataPWB = [
    { pwb: 0, sick: 1, neutral: 0, healthy: 0 },
    { pwb: 3, sick: 0.25, neutral: 0, healthy: 0 },
    { pwb: 4, sick: 0, neutral: 0.5, healthy: 0 },  
    { pwb: 5, sick: 0, neutral: 1, healthy: 0 },  
    { pwb: 6, sick: 0, neutral: 0.5, healthy: 0 },  
    { pwb: 7, sick: 0, neutral: 0, healthy: 0.25 },  
    { pwb: 10, sick: 0, neutral: 0, healthy: 1 },  
  ];


const PhysicalWellBeing: React.FC = () => {

    const [physical_well_being,setPhysical_well_being]=useState('null');

    useEffect(() =>  {
        getSettings().then((responseData)=>{
          if(responseData)
           setPhysical_well_being(responseData.physical_well_being)
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
                        title={'Membership Function for Physical Well-being'}
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
                            data={dataPWB}
                            margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                            dataKey="pwb" 
                            label={{ value: 'Physical Well Being', position: 'insideBottom', offset: -5 }}  
                            domain={['auto', 'auto']}
                            scale="linear"  
                            type='number'
                            tickFormatter={(tick) => `${tick}`}  />
                            <YAxis label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Area type="linear" dataKey="sick" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                            <Area type="linear" dataKey="neutral" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                            <Area type="linear" dataKey="healthy" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />

                            {physical_well_being !== null && (
                            <ReferenceLine 
                                x={physical_well_being} 
                                stroke="red" 
                                strokeWidth="2" 
                                label={{ value: `Current: ${physical_well_being}`, position: 'top', fill: 'red', fontSize:13, offset: 5 }} 
                            />
                            )}

                        </AreaChart>
                    </Card>
                </Col>
            </Row>
            </div>
    );
};

export default PhysicalWellBeing;