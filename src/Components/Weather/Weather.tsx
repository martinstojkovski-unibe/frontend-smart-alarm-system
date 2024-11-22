import React from 'react';
import {  Table, theme , Col, Card, Row} from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



const dataWindSpeed = [
  { wind_speed: 0, calm: 1, breezy: 0, windy: 0 },
  { wind_speed: 10, calm: 0.5, breezy: 0, windy: 0 },
  { wind_speed: 17, calm: 0.15, breezy: 0, windy: 0 },
  { wind_speed: 20, calm: 0, breezy: 0.23077, windy: 0 },
  { wind_speed: 30, calm: 0, breezy: 1, windy: 0 },
  { wind_speed: 44, calm: 0, breezy: 0.125, windy: 0 },
  { wind_speed: 46, calm: 0, breezy: 0, windy: 0.125 },
  { wind_speed: 60, calm: 0, breezy: 0, windy: 1 },
  { wind_speed: 75, calm: 0, breezy: 0, windy: 1 },
];
const dataTemperature = [
  { temperature: -15, cold: 1, moderate: 0, warm: 0 },
  { temperature: 0, cold: 1, moderate: 0, warm: 0 },
  { temperature: 5, cold: 0.28571, moderate: 0, warm: 0 },
  { temperature: 7, cold: 0, moderate: 0.13333, warm: 0 },
  { temperature: 20, cold: 0, moderate: 1, warm: 0 },
  { temperature: 25, cold: 0, moderate: 0.5, warm: 0 },
  { temperature: 30, cold: 0, moderate: 0, warm: 0.33333 },
  { temperature: 40, cold: 0, moderate: 0, warm: 1 },
];



const dataSource = [
  {
    key: '1',
    wind_speed: 'Calm',
    temperature: 'Cold',
    humidity: 'Dry',
    weather: 'Average',
  },
  {
    key: '2',
    wind_speed: 'Calm',
    temperature: 'Cold',
    humidity: 'Normal',
    weather: 'Good',
  },
  {
    key: '3',
    wind_speed: 'Calm',
    temperature: 'Cold',
    humidity: 'Humid',
    weather: 'Average',
  },
  {
    key: '4',
    wind_speed: 'Calm',
    temperature: 'Moderate',
    humidity: 'Dry',
    weather: 'Good',
  },
  {
    key: '5',
    wind_speed: 'Calm',
    temperature: 'Moderate',
    humidity: 'Normal',
    weather: 'Good',
  },
  {
    key: '6',
    wind_speed: 'Calm',
    temperature: 'Moderate',
    humidity: 'Humid',
    weather: 'Average',
  },
  {
    key: '7',
    wind_speed: 'Calm',
    temperature: 'Warm',
    humidity: 'Dry',
    weather: 'Good',
  },
  {
    key: '8',
    wind_speed: 'Calm',
    temperature: 'Warm',
    humidity: 'Normal',
    weather: 'Average',
  },
  {
    key: '9',
    wind_speed: 'Calm',
    temperature: 'Warm',
    humidity: 'Humid',
    weather: 'Bad',
  },
  {
    key: '10',
    wind_speed: 'Breezy',
    temperature: 'Cold',
    humidity: 'Dry',
    weather: 'Average',
  },
  {
    key: '11',
    wind_speed: 'Breezy',
    temperature: 'Cold',
    humidity: 'Normal',
    weather: 'Average',
  },
  {
    key: '12',
    wind_speed: 'Breezy',
    temperature: 'Cold',
    humidity: 'Humid',
    weather: 'Bad',
  },
  {
    key: '13',
    wind_speed: 'Breezy',
    temperature: 'Moderate',
    humidity: 'Dry',
    weather: 'Good',
  },
  {
    key: '14',
    wind_speed: 'Breezy',
    temperature: 'Moderate',
    humidity: 'Normal',
    weather: 'Good',
  },
  {
    key: '15',
    wind_speed: 'Breezy',
    temperature: 'Moderate',
    humidity: 'Humid',
    weather: 'Average',
  },
  {
    key: '16',
    wind_speed: 'Breezy',
    temperature: 'Warm',
    humidity: 'Dry',
    weather: 'Average',
  },
  {
    key: '17',
    wind_speed: 'Breezy',
    temperature: 'Warm',
    humidity: 'Normal',
    weather: 'Average',
  },
  {
    key: '18',
    wind_speed: 'Breezy',
    temperature: 'Warm',
    humidity: 'Humid',
    weather: 'Bad',
  },
  {
    key: '19',
    wind_speed: 'Windy',
    temperature: 'Cold',
    humidity: 'Dry',
    weather: 'Bad',
  },
  {
    key: '20',
    wind_speed: 'Windy',
    temperature: 'Cold',
    humidity: 'Normal',
    weather: 'Bad',
  },
  {
    key: '21',
    wind_speed: 'Windy',
    temperature: 'Cold',
    humidity: 'Humid',
    weather: 'Bad',
  },
  {
    key: '22',
    wind_speed: 'Windy',
    temperature: 'Moderate',
    humidity: 'Dry',
    weather: 'Average',
  },
  {
    key: '23',
    wind_speed: 'Windy',
    temperature: 'Moderate',
    humidity: 'Normal',
    weather: 'Average',
  },
  {
    key: '24',
    wind_speed: 'Windy',
    temperature: 'Moderate',
    humidity: 'Humid',
    weather: 'Bad',
  },
  {
    key: '25',
    wind_speed: 'Windy',
    temperature: 'Warm',
    humidity: 'Dry',
    weather: 'Bad',
  },
  {
    key: '26',
    wind_speed: 'Windy',
    temperature: 'Warm',
    humidity: 'Normal',
    weather: 'Bad',
  },
  {
    key: '27',
    wind_speed: 'Windy',
    temperature: 'Warm',
    humidity: 'Humid',
    weather: 'Bad',
  },
];

const columns = [
  {
    title: 'Wind Speed',
    dataIndex: 'wind_speed',
    key: 'wind_speed',
  },
  {
    title: 'Humidity',
    dataIndex: 'humidity',
    key: 'humidity',
  },
  {
    title: 'Temperature',
    dataIndex: 'temperature',
    key: 'temperature',
  },
  {
    title: 'Weather (Output)',
    dataIndex: 'weather',
    key: 'weather',
  }
];

function Weather() {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    return(
      <div>
        <Row>
        <Col >
          <Card
              title={'Membership Function for Wind Speed'}
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
            data={dataWindSpeed}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="wind_speed" 
              label={{ value: 'Wind Speed', position: 'insideBottom', offset: -5 }}  
              domain={['auto', 'auto']}
              scale="linear"  
              tickFormatter={(tick) => `${tick}`}  />
            <YAxis label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Area type="linear" dataKey="calm" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            <Area type="linear" dataKey="breezy" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
            <Area type="linear" dataKey="windy" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
          </AreaChart>
          </Card>
        </Col>
        <Col >
        <Card
              title={'Membership Function for Temperature'}
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
            data={dataTemperature}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="temperature" 
              label={{ value: 'Temperature', position: 'insideBottom', offset: -5 }}  
              domain={['auto', 'auto']}
              scale="linear"  
              tickFormatter={(tick) => `${tick}`}  />
            <YAxis label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Area type="linear" dataKey="cold" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            <Area type="linear" dataKey="moderate" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
            <Area type="linear" dataKey="warm" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
          </AreaChart>
          </Card>
        </Col>
        <Col>
          <Card
              title={'Fuzzy Rules of Weather Variable'}
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
            data={dataWindSpeed}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="wind_speed" 
              label={{ value: 'Wind Speed', position: 'insideBottom', offset: -5 }}  
              domain={['auto', 'auto']}
              scale="linear"  
              tickFormatter={(tick) => `${tick}`}  />
            <YAxis label={{ value: 'Membership', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Area type="linear" dataKey="calm" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            <Area type="linear" dataKey="breezy" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
            <Area type="linear" dataKey="windy" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
          </AreaChart>
          </Card>
        </Col>
        </Row>
        <Col span={24}>
        <Card
            title={'Fuzzy Rules of Weather Variable'}
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
}

export default Weather;
