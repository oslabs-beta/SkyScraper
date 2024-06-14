import {
  CloudWatchClient,
  GetMetricStatisticsCommand,
  GetMetricStatisticsCommandInput,
  GetMetricStatisticsCommandOutput,
  Datapoint,
} from '@aws-sdk/client-cloudwatch';
import type { cloudController, Datapoints, SanitizedInstances, Results } from '../utils/types.js';
import ErrorObject from '../utils/ErrorObject.js';

const cloudController: cloudController = {
  getEC2Metrics: (req, res, next) => {
    void (async () => {
      try {
        const cloudwatch: CloudWatchClient = new CloudWatchClient({
          region: process.env.REGION,
          credentials: res.locals.credentials,
        });

        // array of metrics to fetch from AWS
        const metricsName: string[] = [
          'CPUUtilization',
          'DiskReadBytes',
          'DiskWriteBytes',
          'NetworkIn',
          'NetworkOut',
          'StatusCheckFailed',
          'StatusCheckFailed_Instance',
          'StatusCheckFailed_System',
        ];

        const results: Results = {};

        // take res.locals.instances object and store to allInstances
        const allInstances: SanitizedInstances[] = res.locals.instances as SanitizedInstances[];

        // declare start and end time with Date method for 24 hour period
        const startTime: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        const endTime: Date = new Date();

        // create a promises array to be sent with Promise.all
        const promises: Promise<void>[] = [];

        // use for of loops to get metrics for each instance
        for (const instance of allInstances) {
          for (const metric of metricsName) {
            const params: GetMetricStatisticsCommandInput = {
              Namespace: 'AWS/EC2',
              MetricName: metric,
              Dimensions: [{ Name: 'InstanceId', Value: instance.InstanceId }],
              StartTime: startTime,
              EndTime: endTime,
              Period: 3600, // Data points in seconds // need to return back to 3600
              Statistics:
                metric === 'StatusCheckFailed' ||
                metric === 'StatusCheckFailed_Instance' ||
                metric === 'StatusCheckFailed_System'
                  ? ['Sum']
                  : ['Average'],
            };
            const instanceId: string = instance.InstanceId;
            const command: GetMetricStatisticsCommand = new GetMetricStatisticsCommand(params);
            const promise: Promise<void> = cloudwatch
              .send(command)
              .then((data: GetMetricStatisticsCommandOutput) => {
                // checks if key exists in results already, if not then assign its value as []
                if (!Object.hasOwn(results, instanceId)) results[instanceId] = [];
                const name: string = instance.Name;
                const sumAvg: string =
                  metric === 'StatusCheckFailed' ||
                  metric === 'StatusCheckFailed_Instance' ||
                  metric === 'StatusCheckFailed_System'
                    ? 'Sum'
                    : 'Average';
                const unit: string =
                  data.Datapoints && data.Datapoints.length > 0
                    ? sumAvg + ' ' + (data.Datapoints[0].Unit ?? '')
                    : 'no data';
                const datapoints: Datapoints[] = (data.Datapoints ?? [])
                  .map((datapoint: Datapoint) => ({
                    Timestamp: new Date(datapoint.Timestamp ?? new Date()),
                    Value: sumAvg === 'Sum' ? datapoint.Sum ?? 0 : datapoint.Average ?? 0,
                  }))
                  .sort(
                    (a, b) => new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime(),
                  );
                results[instanceId].push({
                  name,
                  metric,
                  unit,
                  datapoints,
                });
              });
            promises.push(promise);
          }
        }

        // send all promises at the same time
        await Promise.all(promises).then(() => {
          res.locals.metrics = results;
        });

        next();
        return;
      } catch (err) {
        if (err instanceof Error) {
          next(
            new ErrorObject(
              `Error in getMetrics middleware: ${err.message}`,
              500,
              'Error in getMetrics middleware',
            ),
          );
        } else {
          next(new ErrorObject('the error', 500, 'the error'));
        }
        return;
      }
    })();
  },
};

export default cloudController;
