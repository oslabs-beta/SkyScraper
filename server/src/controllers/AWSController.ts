// import the middleware Types from express for Typescript to work, used in AWSController interface
import { Request, Response, NextFunction } from 'express';

// import default ErrorObject type
import ErrorObject from '../utils/ErrorObject.js';

// migrated to AWS SDK v3 by importing only the needed modules
// EC2Client is a constructor function that has methods that interact with AWS API
import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';

import {
  CloudWatchClient,
  GetMetricStatisticsCommand,
  GetMetricStatisticsCommandInput,
} from '@aws-sdk/client-cloudwatch';

// AWSController is an object that conntains 2 middleware funcs
// we imported the middleware types for these: (Request, Response, NextFunction)
interface AWSController {
  getEC2Instances: (req: Request, res: Response, next: NextFunction) => void;
  getMetricStatistics: (req: Request, res: Response, next: NextFunction) => void;
}

// interface for the responsedata result
// results is an object, we gave instanceID's key type of string and value type of array and referenced it by the value stored for instanceId, on the next level, we are saying the keys in elements of instanceId has to be name with the type string, metric with the type string, unit with the type string and datapoints which is an array where element is an object with a key that has to be a type of string and another key with a value that must be of type number

// results: object
// instanceId: array of objects
// datapoints: array of objects
interface Results {
  [instanceId: string]: {
    name: string;
    metric: string;
    unit: string;
    datapoints: { Timestamp: string; Value: number }[];
  }[];
}
// Example:
// const results = {
//   "i-1234": [{
//     "name": test,
//     "metric": cpuUsage,
//     "unit": avg percent,
//     "datapoints"
//   }]
// }

interface SanitizedInstance {
  InstanceId: string;
  InstanceType: string;
  KeyName: string;
  State: string;
}

const AWSController: AWSController = {
  getEC2Instances: async (req, res, next) => {
    try {
      // create new ec2 client with credentials included
      const ec2 = new EC2Client({
        region: process.env.REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!, // exclamation point default to undefined if .env file error
        },
      });

      // create new command to describe instances
      const command = new DescribeInstancesCommand();

      // invoke describeInstancesCommand and store to data
      const data = await ec2.send(command);

      // checks if data is undefined, returns 404 error 'no reservations found'
      if (!data.Reservations)
        return next(new ErrorObject('no reservation found', 500, 'no reservation found'));

      // flatten data
      const flattedReservation = data.Reservations.map((r) => r.Instances).flat();

      // map and sanitize flattedReservation array
      const sanitizedInstance: SanitizedInstance[] = flattedReservation.map((instance: any) => ({
        InstanceId: instance.InstanceId,
        InstanceType: instance.InstanceType,
        KeyName: instance.KeyName,
        State: instance.State.Name,
      }));

      // store into res.locals.instances
      res.locals.instances = sanitizedInstance;
      return next();
    } catch (err) {
      return next(
        new ErrorObject('The Error: ' + err, 500, 'error in try catch for EC2Instances middleware'),
      );
    }
  },

  getMetricStatistics: async (req, res, next) => {
    try {
      // create cloudwatch client
      const cloudwatch = new CloudWatchClient({
        region: process.env.REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!, // exclamation point default to undefined if .env file error
        },
      });

      // array of metrics we want to gather from AWS
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

      //
      const results: Results = {};

      const allInstances = res.locals.instances;
      const startTime = new Date(new Date().getTime() - 24 * 60 * 60 * 1000); // 24hr period
      const endTime = new Date();

      const promises: Promise<void>[] = [];

      for (const instance of allInstances) {
        for (const metric of metricsName) {
          const params: GetMetricStatisticsCommandInput = {
            Namespace: 'AWS/EC2',
            MetricName: metric,
            Dimensions: [{ Name: 'InstanceId', Value: instance.InstanceId }],
            StartTime: startTime,
            EndTime: endTime,
            Period: 3600, // Data points in seconds
            Statistics:
              metric === 'StatusCheckFailed' ||
              metric === 'StatusCheckFailed_Instance' ||
              metric === 'StatusCheckFailed_System'
                ? ['Sum']
                : ['Average'],
          };

          const instanceId = instance.InstanceId;

          const command = new GetMetricStatisticsCommand(params);
          const promise = cloudwatch.send(command).then((data) => {
            if (!results[instanceId]) {
              results[instanceId] = [];
            }

            const name = instance.KeyName;

            const sumAvg =
              metric === 'StatusCheckFailed' ||
              metric === 'StatusCheckFailed_Instance' ||
              metric === 'StatusCheckFailed_System'
                ? 'Sum'
                : 'Average';

            const unit =
              data.Datapoints && data.Datapoints.length > 0
                ? sumAvg + ' ' + data.Datapoints[0].Unit
                : 'no data';

            const datapoints = (data.Datapoints || [])
              .map((datapoint: any) => ({
                Timestamp: datapoint.Timestamp,
                Value: sumAvg === 'Sum' ? datapoint.Sum || 0 : datapoint.Average || 0,
              }))
              .sort((a, b) => new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime());

            results[instanceId].push({ name, metric, unit, datapoints });
          });
          promises.push(promise);
        }
      }

      await Promise.all(promises);

      res.locals.metrics = results;
      return next();
    } catch (err) {
      return next(
        new ErrorObject(
          'The Error: ' + err,
          500,
          'this string is the response message. Failed to retrieve CPU usage metrics',
        ),
      );
    }
  },
};

export default AWSController;
