import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "./FatigueLevel.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const FatigueLevel: React.FC = () => {
    const [age, setAge] = useState<number>(12);

    // Membership functions for Last Night Sleep (12 y.o. and up)
    const sleepLittleAbove12 = (x: number) =>
        x <= 1 ? 1 : x <= 3 ? (3 - x) / 2 : 0;
    const sleepAverageAbove12 = (x: number) =>
        x <= 3
            ? 0
            : x <= 7
                ? (x - 3) / 4
                : x <= 9
                    ? (9 - x) / 2
                    : 0;
    const sleepHighAbove12 = (x: number) => (x <= 9 ? 0 : x <= 12 ? (x - 9) / 3 : 1);

    // Membership functions for Last Night Sleep (12 y.o. and below)
    const sleepLittleBelow12 = (x: number) =>
        x <= 3 ? 1 : x <= 5 ? (5 - x) / 2 : 0;
    const sleepAverageBelow12 = (x: number) =>
        x <= 5
            ? 0
            : x <= 10
                ? (x - 5) / 5
                : x <= 12
                    ? (12 - x) / 2
                    : 0;
    const sleepHighBelow12 = (x: number) => (x <= 12 ? 0 : x <= 15 ? (x - 12) / 3 : 1);

    // Membership functions for Sleep Debt
    const debtLow = (x: number) => (x <= 3 ? 1 : x <= 5 ? (5 - x) / 2 : 0);
    const debtAverage = (x: number) =>
        x <= 5
            ? 0
            : x <= 7
                ? (x - 5) / 2
                : x <= 15
                    ? (15 - x) / 8
                    : 0;
    const debtHigh = (x: number) => (x <= 15 ? 0 : x <= 30 ? (x - 15) / 15 : 1);

    // Data for Last Night Sleep Graphs
    const sleepMembershipAbove12 = Array.from({ length: 13 }, (_, i) => ({
        x: i,
        little: sleepLittleAbove12(i),
        average: sleepAverageAbove12(i),
        high: sleepHighAbove12(i),
    }));

    const sleepMembershipBelow12 = Array.from({ length: 16 }, (_, i) => ({
        x: i,
        little: sleepLittleBelow12(i),
        average: sleepAverageBelow12(i),
        high: sleepHighBelow12(i),
    }));

    // Data for Sleep Debt Graph
    const debtMembershipData = Array.from({ length: 31 }, (_, i) => ({
        x: i,
        low: debtLow(i),
        average: debtAverage(i),
        high: debtHigh(i),
    }));

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Membership Functions",
            },
        },
        scales: {
            x: {
                type: "linear" as const,
                title: { display: true, text: "Hours/Debt" },
            },
            y: {
                type: "linear" as const,
                title: { display: true, text: "Membership Degree" },
            },
        },
    };

    return (
        <div className="fatigue-level-container">
            <h1>Fatigue Level Analysis</h1>

            {/* Age Slider */}
            <div className="slider-container">
                <label htmlFor="age">Age: {age} years</label>
                <input
                    id="age"
                    type="range"
                    min="0"
                    max="18"
                    step="1"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                />
            </div>

            {/* Last Night Sleep Graphs */}
            <h2>Last Night Sleep Membership Functions (12 y.o. and Up)</h2>
            <div className="chart-container">
                <Line
                    data={{
                        labels: sleepMembershipAbove12.map((data) => data.x),
                        datasets: [
                            {
                                label: "Little Sleep (Above 12)",
                                data: sleepMembershipAbove12.map((data) => data.little),
                                borderColor: "rgb(255, 99, 132)",
                                tension: 0.1,
                            },
                            {
                                label: "Average Sleep (Above 12)",
                                data: sleepMembershipAbove12.map((data) => data.average),
                                borderColor: "rgb(54, 162, 235)",
                                tension: 0.1,
                            },
                            {
                                label: "High Sleep (Above 12)",
                                data: sleepMembershipAbove12.map((data) => data.high),
                                borderColor: "rgb(75, 192, 192)",
                                tension: 0.1,
                            },
                        ],
                    }}
                    options={chartOptions}
                />
            </div>

            <h2>Last Night Sleep Membership Functions (12 y.o. and Below)</h2>
            <div className="chart-container">
                <Line
                    data={{
                        labels: sleepMembershipBelow12.map((data) => data.x),
                        datasets: [
                            {
                                label: "Little Sleep (Below 12)",
                                data: sleepMembershipBelow12.map((data) => data.little),
                                borderColor: "rgb(255, 99, 132)",
                                tension: 0.1,
                            },
                            {
                                label: "Average Sleep (Below 12)",
                                data: sleepMembershipBelow12.map((data) => data.average),
                                borderColor: "rgb(54, 162, 235)",
                                tension: 0.1,
                            },
                            {
                                label: "High Sleep (Below 12)",
                                data: sleepMembershipBelow12.map((data) => data.high),
                                borderColor: "rgb(75, 192, 192)",
                                tension: 0.1,
                            },
                        ],
                    }}
                    options={chartOptions}
                />
            </div>

            {/* Sleep Debt Graph */}
            <h2>Sleep Debt Membership Functions</h2>
            <div className="chart-container">
                <Line
                    data={{
                        labels: debtMembershipData.map((data) => data.x),
                        datasets: [
                            {
                                label: "Low Debt",
                                data: debtMembershipData.map((data) => data.low),
                                borderColor: "rgb(255, 99, 132)",
                                tension: 0.1,
                            },
                            {
                                label: "Average Debt",
                                data: debtMembershipData.map((data) => data.average),
                                borderColor: "rgb(54, 162, 235)",
                                tension: 0.1,
                            },
                            {
                                label: "High Debt",
                                data: debtMembershipData.map((data) => data.high),
                                borderColor: "rgb(75, 192, 192)",
                                tension: 0.1,
                            },
                        ],
                    }}
                    options={chartOptions}
                />
            </div>
        </div>
    );
};

export default FatigueLevel;
