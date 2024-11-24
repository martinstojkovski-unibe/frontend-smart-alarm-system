import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
} from "chart.js";
import "./PhysicalWellBeing.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

const PhysicalWellBeing: React.FC = () => {
    const [physicalWellBeing, setPhysicalWellBeing] = useState(5);

    // Fuzzy membership functions for Physical Well-Being
    const sick = (x: number) => (x <= 3 ? 1 : x <= 4 ? (4 - x) / 1 : 0);
    const neutral = (x: number) =>
        x <= 3 ? 0 : x <= 6 ? (x - 3) / 3 : x <= 7 ? (7 - x) / 1 : 0;
    const healthy = (x: number) => (x <= 6 ? 0 : x <= 10 ? (x - 6) / 4 : 1);

    const membershipData = Array.from({ length: 101 }, (_, i) => {
        const x = i / 10; // Increment by 0.1
        return {
            x,
            sick: sick(x),
            neutral: neutral(x),
            healthy: healthy(x),
        };
    });

    const chartData = {
        labels: membershipData.map((data) => data.x),
        datasets: [
            {
                label: "Sick",
                data: membershipData.map((data) => data.sick),
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: "Neutral",
                data: membershipData.map((data) => data.neutral),
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: "Healthy",
                data: membershipData.map((data) => data.healthy),
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: `Current Value: ${physicalWellBeing}`,
                data: membershipData.map((data) =>
                    Math.abs(data.x - physicalWellBeing) < 0.1 ? 1 : 0
                ),
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 2,
                pointRadius: 3,
                tension: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Membership Functions of Physical Well-Being",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Physical Well-Being Value",
                },
                ticks: {
                    stepSize: 1,
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Membership Degree",
                },
                max: 1.1,
            },
        },
    };

    return (
        <div className="physical-well-being-container">
            <h1>Physical Well-Being Fuzzy System</h1>
            <div className="slider-container">
                <label htmlFor="physicalWellBeing">
                    Physical Well-Being Value: {physicalWellBeing}
                </label>
                <input
                    type="range"
                    id="physicalWellBeing"
                    min="0"
                    max="10"
                    step="0.1"
                    value={physicalWellBeing}
                    onChange={(e) => setPhysicalWellBeing(Number(e.target.value))}
                />
            </div>
            <div className="chart-container">
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default PhysicalWellBeing;
