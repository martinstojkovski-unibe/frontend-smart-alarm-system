import React ,{useState} from 'react';
import {  Layout, theme ,Slider, SliderSingleProps, Col, Row, Button } from 'antd';


const { Content } = Layout;

const marks: SliderSingleProps['marks'] = {
  0: '0',
  10: '10'
};

function Dashboard() {

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    const [data, setData] = useState({sleep_quality:0,schedule_importance:0,mood:0,weather:0,preferred_wake_method:0});
    
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
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
          <Row style={{width: 350, display:'flex',alignItems:'center'}}>
            <Col span={12}>Sleep Quality</Col>
            <Col span={12}>
              <Slider value={data.sleep_quality} min={0} max={10} marks={marks} onChange={(value) => handleChange("sleep_quality", value)} />
            </Col>
          </Row>
          <Row style={{width: 350, display:'flex',alignItems:'center'}}>
            <Col span={12}>Schedule Importance</Col>
            <Col span={12}><Slider value={data.schedule_importance} min={0} max={10} marks={marks} onChange={(value) => handleChange("schedule_importance", value)}/></Col>
          </Row>
          <Row style={{width: 350, display:'flex',alignItems:'center'}}>
            <Col span={12}>Mood</Col>
            <Col span={12}><Slider value={data.mood} min={0} max={10} marks={marks} onChange={(value) => handleChange("mood", value)}/></Col>
          </Row>
          <Row style={{width: 350, display:'flex',alignItems:'center'}}>
            <Col span={12}>Weather</Col>
            <Col span={12}><Slider value={data.weather} min={0} max={10} marks={marks} onChange={(value) => handleChange("weather", value)}/></Col>
          </Row>
          <Row style={{width: 350, display:'flex',alignItems:'center'}}>
            <Col span={12}>Wakeup Method</Col>
            <Col span={12}><Slider value={data.preferred_wake_method} min={0} max={10} marks={marks} onChange={(value) => handleChange("preferred_wake_method", value)} /></Col>
          </Row>
          <Button onClick={()=>submitValues()}>Submit</Button>
        </Content>
        )
}

export default Dashboard;
