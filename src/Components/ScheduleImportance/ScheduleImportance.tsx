import React, { useState } from "react";
import { Card, Slider, Typography } from "antd";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const { Title } = Typography;

const ScheduleImportance: React.FC = () => {
    const [meetingTime, setMeetingTime] = useState(30);
    const [urgentTasks, setUrgentTasks] = useState(5);

    const getMeetingHoursData = () =>
        Array.from({ length: 481 }, (_, x) => ({
            minutes: x,
            Low: x <= 30 ? 1 : x <= 60 ? 1 - (x - 30) / 30 : 0,
            Moderate:
                x <= 60 ? 0 : x <= 180 ? (x - 60) / 120 : x <= 300 ? 1 - (x - 180) / 120 : 0,
            Busy: x <= 180 ? 0 : x <= 300 ? (x - 180) / 120 : x > 300 ? 1 : 0,
            Current: x === meetingTime ? 1 : null,
        }));

    const getUrgentTasksData = () =>
        Array.from({ length: 101 }, (_, i) => {
            const x = i / 10;
            return {
                tasks: x,
                Low: x <= 3 ? 1 : x <= 5 ? 1 - (x - 3) / 2 : 0,
                Some: x <= 3 ? 0 : x <= 5 ? (x - 3) / 2 : x <= 8 ? 1 - (x - 5) / 3 : 0,
                "A Lot": x <= 5 ? 0 : (x - 5) / 5,
                Current: Math.abs(x - urgentTasks) < 0.05 ? 1 : null,
            };
        });

    return (
        <Card title={<Title level={2}>Schedule Importance</Title>}>
            <Card title="Meeting Time">
                <Slider
                    min={0}
                    max={480}
                    value={meetingTime}
                    onChange={setMeetingTime}
                    marks={{ 0: "0", 120: "2h", 240: "4h", 360: "6h", 480: "8h" }}
                />
                <Typography.Text>Meeting Time: {meetingTime} minutes</Typography.Text>
            </Card>

            <Card title="Urgent Tasks">
                <Slider
                    min={0}
                    max={10}
                    step={0.1}
                    value={urgentTasks}
                    onChange={setUrgentTasks}
                    marks={{ 0: "0", 2.5: "2.5", 5: "5", 7.5: "7.5", 10: "10" }}
                />
                <Typography.Text>Urgent Tasks: {urgentTasks.toFixed(1)}</Typography.Text>
            </Card>

            <Card title="Meeting Time Fuzzy Sets">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={getMeetingHoursData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="minutes" label={{ value: "Minutes", position: "insideBottom", offset: -5 }} />
                        <YAxis label={{ value: "Membership Degree", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Low" stroke="#ff6384" dot={false} />
                        <Line type="monotone" dataKey="Moderate" stroke="#36a2eb" dot={false} />
                        <Line type="monotone" dataKey="Busy" stroke="#4bc0c0" dot={false} />
                        <Line type="monotone" dataKey="Current" stroke="#ffcd56" dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            <Card title="Urgent Tasks Fuzzy Sets">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={getUrgentTasksData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tasks" label={{ value: "Tasks", position: "insideBottom", offset: -5 }} />
                        <YAxis label={{ value: "Membership Degree", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Low" stroke="#ff9f40" dot={false} />
                        <Line type="monotone" dataKey="Some" stroke="#9966ff" dot={false} />
                        <Line type="monotone" dataKey="A Lot" stroke="#4bc0c0" dot={false} />
                        <Line type="monotone" dataKey="Current" stroke="#ff6384" dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </Card>
    );
};

export default ScheduleImportance;