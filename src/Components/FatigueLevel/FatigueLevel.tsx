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

const FatigueLevel: React.FC = () => {
  const [age, setAge] = useState<number>(12);

  const sleepMembershipAbove12 = Array.from({ length: 13 }, (_, i) => ({
    hours: i,
    little: Math.max(0, 1 - i / 3),
    average: i <= 3 ? 0 : i <= 7 ? (i - 3) / 4 : Math.max(0, (9 - i) / 2),
    high: i <= 9 ? 0 : Math.min(1, (i - 9) / 3),
  }));

  const sleepMembershipBelow12 = Array.from({ length: 16 }, (_, i) => ({
    hours: i,
    little: Math.max(0, 1 - i / 5),
    average: i <= 5 ? 0 : i <= 10 ? (i - 5) / 5 : Math.max(0, (12 - i) / 2),
    high: i <= 12 ? 0 : Math.min(1, (i - 12) / 3),
  }));

  const debtMembershipData = Array.from({ length: 31 }, (_, i) => ({
    hours: i,
    low: Math.max(0, 1 - i / 5),
    average: i <= 5 ? 0 : i <= 15 ? (i - 5) / 10 : Math.max(0, (20 - i) / 5),
    high: i <= 15 ? 0 : Math.min(1, (i - 15) / 15),
  }));

  return (
      <Card>
        

        <Card title={`Last Night Sleep Membership Functions (${age >= 12 ? "12 y.o. and Up" : "12 y.o. and Below"})`}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={age >= 12 ? sleepMembershipAbove12 : sleepMembershipBelow12}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hours" label={{ value: "Hours", position: "insideBottom", offset: -5 }} />
              <YAxis label={{ value: "Membership Degree", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="little" name="Little Sleep" stroke="#ff6384" dot={false} />
              <Line type="monotone" dataKey="average" name="Average Sleep" stroke="#36a2eb" dot={false} />
              <Line type="monotone" dataKey="high" name="High Sleep" stroke="#4bc0c0" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Sleep Debt Membership Functions">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={debtMembershipData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hours" label={{ value: "Hours", position: "insideBottom", offset: -5 }} />
              <YAxis label={{ value: "Membership Degree", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="low" name="Low Debt" stroke="#ff6384" dot={false} />
              <Line type="monotone" dataKey="average" name="Average Debt" stroke="#36a2eb" dot={false} />
              <Line type="monotone" dataKey="high" name="High Debt" stroke="#4bc0c0" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Card>
  );
};

export default FatigueLevel;