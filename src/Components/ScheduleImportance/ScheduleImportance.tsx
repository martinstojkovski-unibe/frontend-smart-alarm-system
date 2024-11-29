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
import "./ScheduleImportance.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

const ScheduleImportance: React.FC = () => {
    const [meetingTime, setMeetingTime] = useState(30);
    const [urgentTasks, setUrgentTasks] = useState(5);

    const getMeetingHoursData = () => ({
        labels: Array.from({ length: 481 }, (_, i) => i), // 0 to 480 minutes
        datasets: [
            {
                label: "Low",
                data: Array.from({ length: 481 }, (_, x) =>
                    x <= 30 ? 1 : x <= 60 ? 1 - (x - 30) / 30 : 0
                ),
                borderColor: "rgba(255, 99, 132, 1)",
                fill: false,
                tension: 0.4,
            },
            {
                label: "Moderate",
                data: Array.from({ length: 481 }, (_, x) =>
                    x <= 60
                        ? 0
                        : x <= 180
                            ? (x - 60) / 120
                            : x <= 300
                                ? 1 - (x - 180) / 120
                                : 0
                ),
                borderColor: "rgba(54, 162, 235, 1)",
                fill: false,
                tension: 0.4,
            },
            {
                label: "Busy",
                data: Array.from({ length: 481 }, (_, x) =>
                    x <= 180
                        ? 0
                        : x <= 300
                            ? (x - 180) / 120
                            : x > 300
                                ? 1
                                : 0
                ),
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false,
                tension: 0.4,
            },
            {
                label: `Current Value: ${meetingTime}`,
                data: Array.from({ length: 481 }, (_, x) =>
                    x === meetingTime ? 1 : 0
                ),
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 2,
                fill: false,
                pointRadius: 3,
            },
        ],
    });

    const getUrgentTasksData = () => ({
        labels: Array.from({ length: 101 }, (_, i) => i / 10), // 0 to 10 tasks
        datasets: [
            {
                label: "Low",
                data: Array.from({ length: 101 }, (_, x) =>
                    x / 10 <= 3 ? 1 : x / 10 <= 5 ? 1 - (x / 10 - 3) / 2 : 0
                ),
                borderColor: "rgba(255, 159, 64, 1)",
                fill: false,
                tension: 0.4,
            },
            {
                label: "Some",
                data: Array.from({ length: 101 }, (_, x) =>
                    x / 10 <= 3
                        ? 0
                        : x / 10 <= 5
                            ? (x / 10 - 3) / 2
                            : x / 10 <= 8
                                ? 1 - (x / 10 - 5) / 3
                                : 0
                ),
                borderColor: "rgba(153, 102, 255, 1)",
                fill: false,
                tension: 0.4,
            },
            {
                label: "A Lot",
                data: Array.from({ length: 101 }, (_, x) =>
                    x / 10 <= 5 ? 0 : (x / 10 - 5) / 5
                ),
                borderColor: "rgba(75, 192, 192, 1)",
                fill: false,
                tension: 0.4,
            },
            {
                label: `Current Value: ${urgentTasks.toFixed(1)}`,
                data: Array.from({ length: 101 }, (_, x) =>
                    Math.abs(x / 10 - urgentTasks) < 0.05 ? 1 : 0
                ),
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
                fill: false,
                pointRadius: 3,
            },
        ],
    });

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Membership Functions",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Minutes/Tasks",
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
        <div className="schedule-importance-container">
            <h1>Schedule Importance</h1>
            <div className="slider-container">
                <label htmlFor="meetingTime">Meeting Time (0-480 min): {meetingTime} min</label>
                <input
                    type="range"
                    id="meetingTime"
                    min="0"
                    max="480"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(Number(e.target.value))}
                />
            </div>
            <div className="slider-container">
                <label htmlFor="urgentTasks">Urgent Tasks (0-10): {urgentTasks.toFixed(1)}</label>
                <input
                    type="range"
                    id="urgentTasks"
                    min="0"
                    max="10"
                    step="0.1"
                    value={urgentTasks}
                    onChange={(e) => setUrgentTasks(Number(e.target.value))}
                />
            </div>
            <div className="chart-container" style={{ height: "450px" }}>
                <h2>Meeting Time Fuzzy Sets</h2>
                <Line data={getMeetingHoursData()} options={chartOptions} />
            </div>
            <div className="chart-container" style={{ height: "450px" }}>
                <h2>Urgent Tasks Fuzzy Sets</h2>
                <Line data={getUrgentTasksData()} options={chartOptions} />
            </div>
        </div>
    );
};

export default ScheduleImportance;
