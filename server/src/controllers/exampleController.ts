import { Request, Response, NextFunction } from 'express';
import ErrorObject from '../utils/ErrorObject.js';
import AWS from 'aws-sdk';

interface ExampleController {
  getEC2Instances: (req: Request, res: Response, next: NextFunction) => void;
  getMetricStatistics: (req: Request, res: Response, next: NextFunction) => void;
}

const exampleController: ExampleController = {
  getEC2Instances: async (req, res, next) => {
    try {
      // AWS config
      AWS.config.update({
        region: process.env.REGION, // user region from env
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // user keys from env
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      // create ec2 client
      const ec2 = new AWS.EC2();

      // invoke describeInstances and store to data variable
      const data = await ec2.describeInstances().promise();

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
      // AWS config
      AWS.config.update({
        region: process.env.REGION, // user region from env
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // user keys from env
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      // create cloudwatch client
      const cloudwatch = new AWS.CloudWatch();

      // declare parameters
      const params = {
        StartTime: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // duration (24 hours ago)
        EndTime: new Date(),
        MetricName: 'CPUUtilization',
        Namespace: 'AWS/EC2',
        Period: 300, // granularity in seconds
        Statistics: ['Average'],
        Dimensions: [
          {
            Name: 'InstanceId',
            Value: 'i-0af1559a766076588', //instanceid
          },
        ],
      };

      // invoke metrics method and store as data
      const data = await cloudwatch.getMetricStatistics(params).promise();

      // store data to res.locals.cpuUsageData
      res.locals.cpuUsageData = data;

      next();
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
