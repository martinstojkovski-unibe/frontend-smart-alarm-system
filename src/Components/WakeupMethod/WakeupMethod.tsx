import React, { useState } from 'react';
import './WakeupMethod.css';

const WakeupMethod: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<string>('Sound');

    const methods = ['Sound', 'Lights', 'Vibrations'];

    const handleSelectMethod = (method: string) => {
        setSelectedMethod(method);
    };

    return (
        <div className="wake-up-selector">
            <h1>Choose Your Wake-Up Method</h1>
            <div className="methods-container">
                {methods.map((method) => (
                    <button
                        key={method}
                        className={`method-button ${selectedMethod === method ? 'selected' : ''}`}
                        onClick={() => handleSelectMethod(method)}
                    >
                        {method}
                    </button>
                ))}
            </div>
            <div className="selected-method">
                <p>
                    <strong>Your selected method:</strong> {selectedMethod}
                </p>
            </div>
        </div>
    );
};

export default WakeupMethod;
