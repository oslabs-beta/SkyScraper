// components/graphics/CustomBarChart.tsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type {
  DataPoint,
  MetricData,
  CustomBarChartProps,
  TransformedData,
} from '../../../app/types';

const transformEC2Stats = (
  instanceData: MetricData[],
  selectedMetric: string,
): TransformedData[] => {
  const transformedData: TransformedData[] = [];

  instanceData.forEach((metric) => {
    if (metric.metric === selectedMetric) {
      metric.datapoints.forEach((datapoint) => {
        transformedData.push({
          metric: metric.metric,
          timestamp: new Date(datapoint.Timestamp).toLocaleString(),
          value: datapoint.Value,
          unit: metric.unit,
        });
      });
    }
  });

  return transformedData;
};

const CustomBarChart: React.FC<CustomBarChartProps> = ({ instanceData }) => {
  const [selectedMetric, setSelectedMetric] = useState<string>('');

  const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(event.target.value);
  };

  const metrics = instanceData.map((metric) => metric.metric);
  const data = selectedMetric ? transformEC2Stats(instanceData, selectedMetric) : [];
  const unit = data.length > 0 ? data[0].unit : '';

  const sortedMetrics: string[] = metrics.sort();

  return (
    <div className='chart'>
      <label htmlFor='metricSelect'>Select Metric:</label>
      <select id='metricSelect' value={selectedMetric} onChange={handleMetricChange}>
        <option value='' disabled>
          Select a metric
        </option>
        {sortedMetrics.map((metric, index) => (
          <option key={index} value={metric}>
            {metric}
          </option>
        ))}
      </select>
      {selectedMetric && data.length > 0 ? (
        <ResponsiveContainer width='80%' height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
            <XAxis
              dataKey='timestamp'
              label={{ value: `24H Period`, position: 'insideBottom', dy: 30 }}
            />
            <YAxis
              label={{ value: `${unit}`, angle: -90, position: 'outsideTop', dy: -30, dx: -30 }}
            />
            <Tooltip />
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
