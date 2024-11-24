import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import './SleepQuality.css';

interface SleepData {
    ambientNoise: number;
    bedQuality: number;
    stressLevel: number;
    sleepQuality: number;
    morningEnergy: number;
}

const SleepQuality: React.FC = () => {
    const [sleepData, setSleepData] = useState<SleepData>({
        ambientNoise: 5,
        bedQuality: 5,
        stressLevel: 5,
        sleepQuality: 5,
        morningEnergy: 5,
    });
    const [wakeTimeAdjustment, setWakeTimeAdjustment] = useState<number>(0);

    useEffect(() => {
        calculateWakeTimeAdjustment();
    }, [sleepData]);

    const calculateWakeTimeAdjustment = () => {
        const { sleepQuality, morningEnergy } = sleepData;
        let adjustment = 0;

        if (sleepQuality < 3 && morningEnergy < 3) {
            adjustment = -15;
        } else if (sleepQuality > 7 && morningEnergy > 7) {
            adjustment = 15;
        }

        setWakeTimeAdjustment(adjustment);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSleepData((prev) => ({ ...prev, [name]: parseFloat(value) }));
    };

    const chartData = [
        ['Factor', 'Value'],
        ['Ambient Noise', sleepData.ambientNoise],
        ['Bed Quality', sleepData.bedQuality],
        ['Stress Level', sleepData.stressLevel],
        ['Sleep Quality', sleepData.sleepQuality],
        ['Morning Energy', sleepData.morningEnergy],
    ];

    const formatLabel = (key: string) => {
        return key
            .split(/(?=[A-Z])/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="sleep-quality">
            <h1>Sleep Quality Fuzzy System</h1>
            <div className="input-section">
                {Object.entries(sleepData).map(([key, value]) => (
                    <div key={key} className="input-group">
                        <label htmlFor={key}>{formatLabel(key)}:</label>
                        <input
                            type="range"
                            id={key}
                            name={key}
                            min="0"
                            max="10"
                            step="0.1"
                            value={value}
                            onChange={handleInputChange}
                        />
                        <span>{value.toFixed(1)}</span>
                    </div>
                ))}
            </div>
            <div className="chart-section">
                <div className="chart-container">
                    <Chart
                        width={'100%'}
                        height={'100%'}
                        chartType="ColumnChart"
                        loader={<div>Loading Chart...</div>}
                        data={chartData}
                        options={{
                            title: 'Sleep Factors',
                            chartArea: { width: '70%', height: '70%' },
                            hAxis: {
                                title: 'Factor',
                                slantedText: true,
                                slantedTextAngle: 45,
                            },
                            vAxis: { title: 'Value', minValue: 0, maxValue: 10 },
                            legend: { position: 'none' },
                            bar: { groupWidth: '80%' },
                            fontSize: 14,
                        }}
                    />
                </div>
            </div>
            <div className="result-section">
                <h2>Wake Time Adjustment</h2>
                <p
                    className={`adjustment ${
                        wakeTimeAdjustment < 0
                            ? 'delay'
                            : wakeTimeAdjustment > 0
                                ? 'advance'
                                : 'no-change'
                    }`}
                >
                    {wakeTimeAdjustment === 0
                        ? 'No Change'
                        : `${Math.abs(wakeTimeAdjustment)} minutes ${
                            wakeTimeAdjustment < 0 ? 'later' : 'earlier'
                        }`}
                </p>
            </div>
        </div>
    );
};

export default SleepQuality;
