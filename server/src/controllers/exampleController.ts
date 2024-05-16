import { Request, Response, NextFunction } from 'express';
import ErrorObject from '../utils/ErrorObject.js';

// migrated to AWS SDK v3 by importing only the needed modules
import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
import {
  CloudWatchClient,
  GetMetricStatisticsCommand,
  GetMetricStatisticsCommandInput,
} from '@aws-sdk/client-cloudwatch';

interface ExampleController {
  getEC2Instances: (req: Request, res: Response, next: NextFunction) => void;
  getMetricStatistics: (req: Request, res: Response, next: NextFunction) => void;
}

const exampleController: ExampleController = {
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

      // flatten data into instances variable
      const flattedReservation = data.Reservations.map((r) => r.Instances).flat();
      // flattedReservation.forEach((element) => {});

      // store into res.locals.instances
      res.locals.instances = flattedReservation;
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

      interface Results {
        metric: string;
        data: any;
      }

      const metricsName: string[] = [
        'CPUUtilization',
        'DiskReadBytes',
        'DiskWriteBytes',
        'NetworkIn',
        'NetworkOut',
      ];

      const metricsNameStatus: string[] = [
        'StatusCheckFailed',
        'StatusCheckFailed_Instance',
        'StatusCheckFailed_System',
      ];
      const results: Results[] = [];

      for (const metric of metricsName) {
        const params: GetMetricStatisticsCommandInput = {
          Namespace: 'AWS/EC2',
          MetricName: metric,
          Dimensions: [{ Name: 'InstanceId', Value: 'i-0af1559a766076588' }],
          StartTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 24hr period
          EndTime: new Date(),
          Period: 3600, // Data points in seconds
          Statistics: ['Average'],
        };

        const command = new GetMetricStatisticsCommand(params);
        const data = await cloudwatch.send(command);
        results.push({ metric, data });
      }

      for (const metric of metricsNameStatus) {
        const params: GetMetricStatisticsCommandInput = {
          Namespace: 'AWS/EC2',
          MetricName: metric,
          Dimensions: [{ Name: 'InstanceId', Value: 'i-0af1559a766076588' }],
          StartTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // 24hr period
          EndTime: new Date(),
          Period: 3600, // Data points in seconds
          Statistics: ['Sum'],
        };

        const command = new GetMetricStatisticsCommand(params);
        const data = await cloudwatch.send(command);
        results.push({ metric, data });
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
        label: string;
        unit: string;
        datapoints: { Timestamp: string; Average: number; Sum: number }[];
      }
      const metrics: Metrics[] = [];

      for (const ele of results) {
        const data: Data = ele.data;
        const label = data.Label;
        const unit = data.Datapoints[0].Unit;
        const datapoints = data.Datapoints.map((datapoint: Datapoint) => {
          return { Timestamp: datapoint.Timestamp, Average: datapoint.Average, Sum: datapoint.Sum };
        });
        metrics.push({ label, unit, datapoints });
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

export default exampleController;
