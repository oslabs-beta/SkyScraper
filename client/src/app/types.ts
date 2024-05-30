export interface DashboardState {
  instances: EC2Instance[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface EC2StatsState {
  stats: EC2Stats;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface DataPoint {
  Timestamp: Date;
  Value: number;
}

export interface MetricData {
  name: string;
  metric: string;
  unit: string;
  datapoints: DataPoint[];
}

export type EC2Stats = Record<string, MetricData[]>;

export interface EC2Instance {
  InstanceId: string;
  InstanceType: string;
  Name: string;
  State: string;
}

export interface CustomBarChartProps {
  instanceData: MetricData[];
}

export interface TransformedData {
  metric: string;
  timestamp: string;
  value: number;
  unit: string;
}
