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
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!, // AWS Secret Access Key
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
      const instances = data.Reservations.map((r) => r.Instances).flat();

      // store into res.locals.instances
      res.locals.instances = instances;
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
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!, // AWS Secret Access Key
        },
      });

      // declare parameters for the getMetricStatsCommand method
      const paramsCPU: GetMetricStatisticsCommandInput = {
        StartTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // duration (24 hours ago)
        EndTime: new Date(),
        MetricName: 'CPUUtilization',
        Namespace: 'AWS/EC2',
        Period: 300, // in seconds
        Statistics: ['Average'],
        Dimensions: [
          {
            Name: 'InstanceId',
            Value: 'i-0af1559a766076588', // instanceid from query
          },
        ],
      };

      const paramsDisk: GetMetricStatisticsCommandInput = {
        StartTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // duration (24 hours ago)
        EndTime: new Date(),
        MetricName: 'DiskUtilization',
        Namespace: 'AWS/EC2',
        Period: 300, // in seconds
        Statistics: ['Average'],
        Dimensions: [
          {
            Name: 'InstanceId',
            Value: 'i-0af1559a766076588', // instanceid from query
          },
          {
            Name: 'Device',
            Value: '/dev/xvda',
          },
        ],
      };

      // create commands
      const commandCPU = new GetMetricStatisticsCommand(paramsCPU);
      const commandDisk = new GetMetricStatisticsCommand(paramsDisk);

      // invoke metrics methods and store as data
      const data = await cloudwatch.send(commandCPU);
      const data2 = await cloudwatch.send(commandDisk);

      // store data to res.locals.cpuUsageData
      res.locals.cpuUsage = data;
      res.locals.diskUsage = data2;

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
