import React, { useState } from "react";
import { Card, Slider, Typography, Row, Col } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const { Title, Text } = Typography;

const SleepQuality: React.FC = () => {
    const [sleepQuality, setSleepQuality] = useState(5);

    const formatLabel = (key: string) => {
        return key
            .split(/(?=[A-Z])/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const membershipData = Array.from({ length: 101 }, (_, i) => {
        const x = i / 10;
        return {
            x,
            sick: Math.max(0, 1 - x / 3),
            neutral: x <= 3 ? 0 : x <= 5 ? (x - 3) / 2 : Math.max(0, (7 - x) / 2),
            healthy: x <= 5 ? 0 : Math.min(1, (x - 5) / 5),
            current: Math.abs(x - sleepQuality) < 0.1 ? 1 : 0,
        };
    });

    return (
        <Card title={<Title level={2}>Sleep Quality Fuzzy System</Title>}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Text>Sleep Quality Value: {sleepQuality}</Text>
                    <Slider
                        min={0}
                        max={10}
                        step={0.1}
                        value={sleepQuality}
                        onChange={setSleepQuality}
                    />
                </Col>
                <Col span={24}>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={membershipData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" label={{ value: "Sleep Quality Value", position: "insideBottom", offset: -5 }} />
                            <YAxis label={{ value: "Membership Degree", angle: -90, position: "insideLeft" }} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sick" name="Sick" stroke="#ff6384" dot={false} />
                            <Line type="monotone" dataKey="neutral" name="Neutral" stroke="#36a2eb" dot={false} />
                            <Line type="monotone" dataKey="healthy" name="Healthy" stroke="#4bc0c0" dot={false} />
                            <Line type="monotone" dataKey="current" name={`Current Value: ${sleepQuality}`} stroke="#ffcd56" dot={{ r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Col>
            </Row>
        </Card>
    );
};

export default SleepQuality;