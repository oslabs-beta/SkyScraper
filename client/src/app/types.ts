export interface AuthState {
  tokens: {
    access_token: string | null;
    id_token: string | null;
  };
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

export interface DropdownState {
  showDropdown: boolean;
}

export interface ThemeState {
  mode: string;
}
