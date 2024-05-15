import { Request, Response, NextFunction } from 'express';
import ErrorObject from '../utils/ErrorObject.js';
import AWS from 'aws-sdk';

interface ExampleController {
  getEC2: (req: Request, res: Response, next: NextFunction) => void;
  getMetricStatistics: (req: Request, res: Response, next: NextFunction) => void;
}

const exampleController: ExampleController = {
  getEC2: async (req, res, next) => {
    try {
      AWS.config.update({
        region: 'us-east-1', // Your AWS region
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Ensure these are set in your environment
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });
      const ec2 = new AWS.EC2();
      console.log(AWS.config);
      // invoke describeInstances
      const data = await ec2.describeInstances().promise();

      // checks if data is undefined, returns 404 error 'no reservations found'
      if (!data.Reservations)
        return next(new ErrorObject('no reservation found', 500, 'no reservation found'));

      const instances = data.Reservations.map((r) => r.Instances).flat();
      res.locals.instances = instances;
      return next();
    } catch (err) {
      return next(new ErrorObject('error: ' + err, 500, 'error in catch for EC2 middleware'));
    }
  },
  getMetricStatistics: async (req, res, next) => {
    try {
      AWS.config.update({
        region: 'us-east-1', // Your AWS region
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Ensure these are set in your environment
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });
      
      const cloudwatch = new AWS.CloudWatch();
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
