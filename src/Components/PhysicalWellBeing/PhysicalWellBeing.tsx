import React, {useState} from "react";
import {Card, Slider, Typography} from "antd";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const {Title, Text} = Typography;

const PhysicalWellBeing: React.FC = () => {
    const [physicalWellBeing, setPhysicalWellBeing] = useState(5);

    // Fuzzy membership functions for Physical Well-Being
    const sick = (x: number) => (x <= 3 ? 1 : x <= 4 ? (4 - x) / 1 : 0);
    const neutral = (x: number) =>
        x <= 3 ? 0 : x <= 6 ? (x - 3) / 3 : x <= 7 ? (7 - x) / 1 : 0;
    const healthy = (x: number) => (x <= 6 ? 0 : x <= 10 ? (x - 6) / 4 : 1);

    const membershipData = Array.from({length: 101}, (_, i) => {
        const x = i / 10; // Increment by 0.1
        return {
            x,
            sick: sick(x),
            neutral: neutral(x),
            healthy: healthy(x),
            current: Math.abs(x - physicalWellBeing) < 0.1 ? 1 : null,
        };
    });

    return (
        <Card title={<Title level={2}>Physical Well-Being Fuzzy System</Title>}>
            <Text>Physical Well-Being Value: {physicalWellBeing}</Text>
            <Slider
                min={0}
                max={10}
                step={0.1}
                value={physicalWellBeing}
                onChange={setPhysicalWellBeing}
            />
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={membershipData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis
                        dataKey="x"
                        label={{value: "Physical Well-Being Value", position: "insideBottom", offset: -5}}
                    />
                    <YAxis
                        label={{value: "Membership Degree", angle: -90, position: "insideLeft"}}
                        domain={[0, 1.1]}
                    />
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="sick" name="Sick" stroke="#ff6384" dot={false}/>
                    <Line type="monotone" dataKey="neutral" name="Neutral" stroke="#36a2eb" dot={false}/>
                    <Line type="monotone" dataKey="healthy" name="Healthy" stroke="#4bc0c0" dot={false}/>
                    <Line type="monotone" dataKey="current" name={`Current Value: ${physicalWellBeing}`}
                          stroke="#ffcd56" dot={{r: 5}}/>
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default PhysicalWellBeing;