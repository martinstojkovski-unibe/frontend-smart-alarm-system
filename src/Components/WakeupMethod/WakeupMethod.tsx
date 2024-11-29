import React, { useState } from 'react';
import { Card, Radio, Typography, Space } from 'antd';

const { Title, Text } = Typography;

const WakeupMethod: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<string>('Sound');

    const methods = ['Sound', 'Lights', 'Vibrations'];

    return (
        <Card title={<Title level={2}>Choose Your Wake-Up Method</Title>}>
            <Space direction="vertical" size="large">
                <Radio.Group
                    value={selectedMethod}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    buttonStyle="solid"
                >
                    <Space direction="horizontal">
                        {methods.map((method) => (
                            <Radio.Button key={method} value={method}>
                                {method}
                            </Radio.Button>
                        ))}
                    </Space>
                </Radio.Group>
                <Text strong>
                    Your selected method: <Text type="secondary">{selectedMethod}</Text>
                </Text>
            </Space>
        </Card>
    );
};

export default WakeupMethod;