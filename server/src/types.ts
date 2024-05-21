// AWSController
export interface SanitizedInstances {
  InstanceId: string;
  InstanceType: string;
  Name: string;
  State: string;
}

// AWSController
export interface Results {
  [instanceId: string]: {
    name: string;
    metric: string;
    unit: string;
    datapoints: { Timestamp: Date; Value: number }[];
  }[];
}
