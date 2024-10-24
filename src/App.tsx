import React, {useState} from 'react';
import { Route,Routes, useNavigate } from 'react-router-dom';
import {
  SunOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  SoundOutlined,
  UserOutlined,
  HourglassOutlined,
  StarOutlined
} from '@ant-design/icons';
import {  Layout, Menu, Typography } from 'antd';
import Dashboard from './Components/Dashboard/Dashboard';
import Mood from './Components/Mood/Mood';
import Weather from './Components/Weather/Weather';
import SleepQuality from './Components/SleepQuality/SleepQuality';
import WakeupMethod from './Components/WakeupMethod/WakeupMethod';
import ScheduleImportance from './Components/ScheduleImportance/ScheduleImportance';
import FatigueLevel from './Components/FatigueLevel/FatigueLevel';

const { Header, Sider } = Layout;
const { Title } = Typography;

function App() {
  const [itemName, setItemName] = useState("Dashboard");
  const [description, setDescription] = useState("Overview of the Fuzzy System");

  const navigate = useNavigate();
  
  const items=[
    {
      key: '1',
      icon:<AppstoreOutlined />,
      label: 'Dashboard',
      description: 'Overview of the Fuzzy System',
      target:'/',
    },
    {
      key: '2',
      icon: <StarOutlined />,
      label: 'Sleep Quality',
      description: 'Fuzzy Variables & Membership Functions of Sleep Quality',
      target:'/sleep-quality'
    },
    {
      key: '3',
      icon: <HourglassOutlined />,
      label: 'Fatigue Level',
      description: 'Fuzzy Variables & Membership Functions of Fatigue Level',
      target:'/fatigue-level'
    },
    {
      key: '4',
      icon: <ScheduleOutlined />,
      label: 'Schedule Importance',
      description: 'Fuzzy Variables & Membership Functions of Schedule Importance',
      target:'/schedule-importance'
    },
    {
      key: '5',
      icon: <SoundOutlined />,
      label: 'Wakeup Method',
      description: 'Fuzzy Variables & Membership Functions of Wakeup Method',
      target:'/wakeup-method'
    },
    {
      key: '6',
      icon: <UserOutlined />,
      label: 'Mood',
      description: 'Fuzzy Variables & Membership Functions of Mood',
      target:'/mood'
    },
    {
      key: '7',
      icon: <SunOutlined />,
      label: 'Weather',
      description: 'Fuzzy Variables & Membership Functions of Weather',
      target:'/weather'
    }
  ];

  const handleMenuClick = ({ key }:{key:any}) => {
    setItemName(items.find((elm) => elm!.key === key)!.label);
    setDescription(items.find((elm) => elm!.key === key)!.description);
    const { target } = items.find(item => item.key === key) || {};
    if (target) {
      navigate(target);
    }
  };

  return (
    <div className="App">
      <Layout style={{height:"100vh"}} >
      <Sider trigger={null} collapsible={false} collapsed={true} style={{background:'white'}}>
        <Menu
          style={{marginTop:100}}
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          selectable
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, backgroundColor: 'transparent',marginLeft:16,marginBottom:20 }}>
          <Title level={2} style={{marginBottom:0}}>{itemName}</Title>
          <Title level={5} type='secondary' style={{marginTop:0}}>{description}</Title>
        </Header>
        <Routes>        
          <Route path="/"  element={<Dashboard/>} />
          <Route path="/mood"  element={<Mood />}/>
          <Route path="/weather"  element={<Weather/>}/>
          <Route path="/sleep-quality"  element={<SleepQuality/>}/>
          <Route path="/wakeup-method"  element={<WakeupMethod/>}/>
          <Route path="/schedule-importance"  element={<ScheduleImportance/>}/>
          <Route path="/fatigue-level"  element={<FatigueLevel/>}/>
        </Routes>
      </Layout>
    </Layout>
  </div>
  );
}

export default App;
