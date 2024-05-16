import { Request, Response, NextFunction } from 'express';
import ErrorObject from '../utils/ErrorObject.js';

// migrated to AWS SDK v3 by importing only the needed modules
import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import {
  CloudWatchClient,
  GetMetricStatisticsCommand,
  GetMetricStatisticsCommandInput,
} from '@aws-sdk/client-cloudwatch';

interface AWSController {
  getEC2Instances: (req: Request, res: Response, next: NextFunction) => void;
  getMetricStatistics: (req: Request, res: Response, next: NextFunction) => void;
}

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

      // //interface for sanitized data
      // interface SanitizedInstance {
      //   InstanceId: string;
      //   InstanceType: string;
      //   KeyName: string;
      //   State: string;
      // }

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

      interface Results {
        instanceID: string;
        metric: string;
        data: any;
      }

      const results: Results[] = [];

      const allInstances = res.locals.instances;
      console.log(allInstances);

      for (const instance of allInstances) {
        for (const metric of metricsName) {
          const params: GetMetricStatisticsCommandInput = {
            Namespace: 'AWS/EC2',
            MetricName: metric,
            Dimensions: [{ Name: 'InstanceId', Value: instance.InstanceId }],
            StartTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 24hr period
            EndTime: new Date(),
            Period: 3600, // Data points in seconds
            Statistics:
              metric === 'StatusCheckFailed' ||
              metric === 'StatusCheckFailed_Instance' ||
              metric === 'StatusCheckFailed_System'
                ? ['Sum']
                : ['Average'],
          };
          const instanceID = instance.InstanceId;
          const command = new GetMetricStatisticsCommand(params);
          const data = await cloudwatch.send(command);
          results.push({instanceID, metric, data });
        }
      }

      interface Datapoint {
        Timestamp: string; // or Date if you prefer
        Average: number;
        Unit: string;
        Sum: number;
      }

      interface Data {
        Label: string;
        Datapoints: Datapoint[];
      }

      interface Metrics {
        instanceId: string;
        label: string;
        unit: string;
        datapoints: { Timestamp: string; Average: number; Sum: number }[];
      }
      const metrics: Metrics[] = [];

      for (const ele of results) {
        const data: Data = ele.data;
        const label = data.Label;
        const instanceId = ele.instanceID
        const unit = data.Datapoints[0].Unit;
        const datapoints = data.Datapoints.map((datapoint: Datapoint) => {
          return { Timestamp: datapoint.Timestamp, Average: datapoint.Average, Sum: datapoint.Sum };
        });
        metrics.push({ label,instanceId, unit, datapoints });
      }
      //{label: "cpu", unit :"percentage", datapoints:[{timestamp:"xxx",averag:"xxx"}]}
      res.locals.metrics = metrics;

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
