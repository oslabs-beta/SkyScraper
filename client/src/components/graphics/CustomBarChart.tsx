// components/graphics/CustomBarChart.tsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  Timestamp: string;
  Value: number;
}

interface MetricData {
  name: string;
  metric: string;
  unit: string;
  datapoints: DataPoint[];
}

interface InstanceData {
  [instanceId: string]: {
    name: string;
    metric: string;
    unit: string;
    datapoints: { Timestamp: Date; Value: number }[];
  }[];
}

interface CustomBarChartProps {
  stats: InstanceData;
}

interface TransformedData {
  instanceId: string;
  metric: string;
  timestamp: string;
  value: number;
}

const transformEC2Stats = (stats: InstanceData, selectedMetric: string): TransformedData[] => {
  const transformedData: TransformedData[] = [];

  Object.keys(stats).forEach((instanceId) => {
    stats[instanceId].forEach((metric) => {
      if (metric.metric === selectedMetric) {
        metric.datapoints.forEach((datapoint) => {
          transformedData.push({
            instanceId,
            metric: metric.metric,
            timestamp: new Date(datapoint.Timestamp).toLocaleString(),
            value: datapoint.Value,
          });
        });
      }
    });
  });

  return transformedData;
};

const CustomBarChart: React.FC<CustomBarChartProps> = ({ stats }) => {
  const [selectedMetric, setSelectedMetric] = useState<string>('');

  // Check if stats has data and get metrics from the first instance
  const metrics =
    stats && Object.keys(stats).length > 0
      ? Object.values(stats)[0]?.map((metric) => metric.metric)
      : [];

  const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(event.target.value);
  };

  const data = selectedMetric ? transformEC2Stats(stats, selectedMetric) : [];

  return (
    <div>
      <label htmlFor='metricSelect'>Select Metric:</label>
      <select id='metricSelect' value={selectedMetric} onChange={handleMetricChange}>
        <option value='' disabled>
          Select a metric
        </option>
        {metrics.map((metric, index) => (
          <option key={index} value={metric}>
            {metric}
          </option>
        ))}
      </select>
      {selectedMetric && data.length > 0 ? (
        <ResponsiveContainer width='100%' height={400}>
          <BarChart data={data}>
            <XAxis dataKey='timestamp' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='value' fill='#8884d8' />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available for the selected metric.</p>
      )}
    </div>
  );
};

export default CustomBarChart;
