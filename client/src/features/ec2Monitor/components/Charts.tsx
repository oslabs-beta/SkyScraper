import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useAppSelector } from '../../../app/hooks';
import type { MetricData, CustomBarChartProps, TransformedData } from '../../../app/types';

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

const Charts: React.FC<CustomBarChartProps> = ({ instanceData }) => {
  const [selectedMetric, setSelectedMetric] = useState<string>('');
  const [chartType, setChartType] = useState<string>('bar');
  const mode = useAppSelector((state) => state.rootReducer.theme.mode);

  const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMetric(event.target.value);
  };

  const handleChartTypeToggle = () => {
    setChartType((prevType) => (prevType === 'bar' ? 'line' : 'bar'));
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
      <button onClick={handleChartTypeToggle}>
        Toggle to {chartType === 'bar' ? 'Line Chart' : 'Bar Chart'}
      </button>
      {selectedMetric && data.length > 0 ? (
        <ResponsiveContainer width='80%' height={400}>
          {chartType === 'bar' ? (
            <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
              <XAxis
                dataKey='timestamp'
                label={{ value: `24 Hour Period`, position: 'insideBottom', dy: 30 }}
              />
              <YAxis
                label={{ value: unit, angle: -90, position: 'outsideTop', dy: -30, dx: -30 }}
              />
              <Tooltip />
              <Bar dataKey='value' fill={mode === 'light' ? '#8884d8' : '#ffd700'} />
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
              <XAxis
                dataKey='timestamp'
                label={{ value: `24H Period`, position: 'insideBottom', dy: 30 }}
              />
              <YAxis
                label={{ value: unit, angle: -90, position: 'outsideTop', dy: -30, dx: -30 }}
              />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='value'
                fill={mode === 'light' ? '#8884d8' : '#ffd700'}
                stroke={mode === 'light' ? '#8884d8' : '#ffd700'}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      ) : (
        <p>No data available for the selected metric</p>
      )}
    </div>
  );
};

export default Charts;
