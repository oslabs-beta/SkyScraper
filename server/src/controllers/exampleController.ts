import { Request, Response, NextFunction } from 'express';
import ErrorObject from '../utils/ErrorObject';
import AWS from 'aws-sdk';

const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
const cloudwatch = new AWS.CloudWatch();

interface ExampleController {
  exampleMiddleware: (req: Request, res: Response, next: NextFunction) => void;
  getMetricStatistics: (req: Request, res: Response, next: NextFunction) => void;
}

const exampleController: ExampleController = {
  exampleMiddleware: async (req, res, next) => {
    try {
      return next();
    } catch (err) {
      return next(
        new ErrorObject('this string is the error log', 500, 'this string is the response message'),
      );
    }
  },
  getMetricStatistics: async (req, res, next) => {
    try {
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
      const data = await cloudwatch.getMetricStatistics(params).promise();
      res.locals.cpuUsageData = data; // Attach data to the request object
      next(); // Call the next middleware or route handler
      return next();
    } catch (err) {
      return next(
        new ErrorObject(
          'this string is the error log',
          500,
          'this string is the response message. Failed to retrieve CPU usage metrics',
        ),
      );
    }
  },
};

export default exampleController;
