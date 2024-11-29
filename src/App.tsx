import React, {useEffect, useState} from 'react';
import { Route,Routes, useNavigate, useLocation } from 'react-router-dom';
import {
  SunOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  SoundOutlined,
  UserOutlined,
  HourglassOutlined,
  StarOutlined,
  SettingOutlined
} from '@ant-design/icons';
import {  Layout, Menu, Typography } from 'antd';
import Dashboard from './Components/Dashboard/Dashboard';
import Weather from './Components/Weather/Weather';
import SleepQuality from './Components/SleepQuality/SleepQuality';
import WakeupMethod from './Components/WakeupMethod/WakeupMethod';
import ScheduleImportance from './Components/ScheduleImportance/ScheduleImportance';
import FatigueLevel from './Components/FatigueLevel/FatigueLevel';
import Settings from './Components/Settings/Settings';
import PhysicalWellBeing from "./Components/PhysicalWellBeing/PhysicalWellBeing";

const { Header, Sider } = Layout;
const { Title } = Typography;

function App() {
  const [itemName, setItemName] = useState("Dashboard");
  const [description, setDescription] = useState("Overview of the Fuzzy System");
  const [defaultSelectedKeys,setDefaultKey] = useState<string[]>([])

  const navigate = useNavigate();

  const location = useLocation();


  useEffect(()=>{
    setItemName(items.find((elm) => elm!.target === location.pathname)!.label)
    setDescription(items.find((elm) => elm!.target === location.pathname)!.description)
    defaultSelectedKeys.push(items.find((elm) => elm!.target === location.pathname)!.key)
  },[location.pathname])
  
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
      icon: <UserOutlined />,
      label: 'Physical Well-being',
      description: 'Fuzzy Variables & Membership Functions of Physical Well-being',
      target:'/physical-well-being'
    },
    {
      key: '6',
      icon: <SunOutlined />,
      label: 'Weather',
      description: 'Fuzzy Variables & Membership Functions of Weather',
      target:'/weather'
    },
    {
      key: '7',
      icon: <SettingOutlined />,
      label: 'Settings',
      description: 'Input Your Static Variables To The System',
      target:'/settings'
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

  const [selectedMethod, setSelectedMethod] = useState<string>('Sound');

  const methods = ['Sound', 'Lights', 'Vibrations'];

  const handleSelectMethod = (method: string) => {
      setSelectedMethod(method);
  };

  return (
    <div className="App">
      <Layout style={{minHeight:"100vh"}} >
      <Sider trigger={null} collapsible={false} collapsed={true} style={{background:'white'}}>
        <Menu
          style={{marginTop:100}}
          theme="light"
          mode="inline"
          defaultSelectedKeys={defaultSelectedKeys}
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
          <Route path="/physical-well-being"  element={<PhysicalWellBeing />}/>
          <Route path="/weather"  element={<Weather/>}/>
          <Route path="/sleep-quality"  element={<SleepQuality/>}/>
          <Route path="/schedule-importance"  element={<ScheduleImportance/>}/>
          <Route path="/fatigue-level"  element={<FatigueLevel/>}/>
          <Route path="/settings"  element={<Settings/>}/>
        </Routes>
      </Layout>
    </Layout>
  </div>
  );
}

export default App;
