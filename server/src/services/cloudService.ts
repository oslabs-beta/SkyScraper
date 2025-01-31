import {
  CloudWatchClient,
  GetMetricStatisticsCommand,
  GetMetricStatisticsCommandInput,
  GetMetricStatisticsCommandOutput,
  Datapoint,
} from '@aws-sdk/client-cloudwatch';
import type { Datapoints, SanitizedInstances, Results } from '../utils/types.js';

const METRICS_NAMES: string[] = [
  'CPUUtilization',
  'DiskReadBytes',
  'DiskWriteBytes',
  'NetworkIn',
  'NetworkOut',
  'StatusCheckFailed',
  'StatusCheckFailed_Instance',
  'StatusCheckFailed_System',
];

export const fetchEC2Metrics = async (
  instances: SanitizedInstances[],
  credentials: any,
  region: string | undefined,
): Promise<Results> => {
  const cloudwatch = new CloudWatchClient({ region, credentials });
  const results: Results = {};
  const startTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const endTime = new Date();
  const promises: Promise<void>[] = [];

  for (const instance of instances) {
    for (const metric of METRICS_NAMES) {
      const params: GetMetricStatisticsCommandInput = {
        Namespace: 'AWS/EC2',
        MetricName: metric,
        Dimensions: [{ Name: 'InstanceId', Value: instance.InstanceId }],
        StartTime: startTime,
        EndTime: endTime,
        Period: 3600,
        Statistics: metric.includes('StatusCheckFailed') ? ['Sum'] : ['Average'],
      };

      const instanceId = instance.InstanceId;
      const command = new GetMetricStatisticsCommand(params);

      const promise = cloudwatch.send(command).then((data: GetMetricStatisticsCommandOutput) => {
        if (!results[instanceId]) results[instanceId] = [];

        const name = instance.Name;
        const sumAvg = metric.includes('StatusCheckFailed') ? 'Sum' : 'Average';
        const unit = data.Datapoints?.length
          ? `${sumAvg} ${data.Datapoints[0].Unit ?? ''}`
          : 'no data';

        const datapoints: Datapoints[] = (data.Datapoints ?? [])
          .map((datapoint: Datapoint) => ({
            Timestamp: new Date(datapoint.Timestamp ?? new Date()),
            Value: sumAvg === 'Sum' ? datapoint.Sum ?? 0 : datapoint.Average ?? 0,
          }))
          .sort((a, b) => new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime());

        results[instanceId].push({ name, metric, unit, datapoints });
      });

      promises.push(promise);
    }
  }

  await Promise.all(promises);
  return results;
};
