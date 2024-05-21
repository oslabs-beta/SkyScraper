// import the middleware Types from express for Typescript to work, used in AWSController interface
import { Request, Response, NextFunction } from 'express';

// import default ErrorObject type
import ErrorObject from '../utils/ErrorObject.js';

// migrated to AWS SDK v3 by importing only the needed modules
// EC2Client is a constructor function that has methods that interact with AWS API
import {
  EC2Client,
  DescribeInstancesCommand,
  DescribeInstancesCommandOutput,
  Instance,
  Reservation,
} from '@aws-sdk/client-ec2';

import {
  CloudWatchClient,
  GetMetricStatisticsCommand,
  GetMetricStatisticsCommandInput,
  GetMetricStatisticsCommandOutput,
  Datapoint,
} from '@aws-sdk/client-cloudwatch';

// import specific interfaces from dedicated types file
import { SanitizedInstances, Results } from '../types.js';

// AWSController is an object that conntains 2 middleware funcs
// we imported the middleware types for these: (Request, Response, NextFunction)
interface AWSController {
  getEC2Instances: (req: Request, res: Response, next: NextFunction) => void;
  getMetricStatistics: (req: Request, res: Response, next: NextFunction) => void;
}

const AWSController: AWSController = {
  getEC2Instances: async (req, res, next) => {
    try {
      // create new ec2 client with credentials included
      const ec2: EC2Client = new EC2Client({
        region: process.env.REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!, // exclamation point default to undefined if .env file error
        },
      });

      // create new command to describe instances, DescibeiIstancesCommand is a class object which contains a contrustor w/ a default value passed in as a n object in the contructor portion
      // invoke describeInstancesCommand and store to command
      //command object has a middleware it self!!!!!
      const command: DescribeInstancesCommand = new DescribeInstancesCommand({});

      // the ec2 client sends a promise and the param is the command
      // the command object then sends an HTTPS request via its own middleware and returns a promise object
      // when resolved, the data is stored as the return

      const data: DescribeInstancesCommandOutput = await ec2.send(command);

      // checks if data is undefined, returns 404 error 'no reservations found'
      if (!data.Reservations)
        return next(new ErrorObject('no reservation found', 500, 'no reservation found'));

      // flatten data
      const flattedReservation: Instance[] = data.Reservations.map((r: Reservation) => r.Instances)
        .flat()
        .filter((instance: Instance | undefined) => instance !== undefined) as Instance[];

      // map and sanitize flattedReservation array
      const sanitizedInstances: SanitizedInstances[] = flattedReservation.map((instance: any) => ({
        InstanceId: instance.InstanceId,
        InstanceType: instance.InstanceType,
        Name: instance.Tags[0].Value,
        State: instance.State.Name,
      }));

      // store sanitizedInstances into res.locals.instances
      res.locals.instances = sanitizedInstances;

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
      const cloudwatch: CloudWatchClient = new CloudWatchClient({
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

      // interface for the responsedata result
      // results is an object, we gave instanceID's key type of string and value type of array and referenced it by the value stored for instanceId, on the next level, we are saying the keys in elements of instanceId has to be name with the type string, metric with the type string, unit with the type string and datapoints which is an array where element is an object with a key that has to be a type of string and another key with a value that must be of type number
      // results: object
      // instanceId: array of objects
      // datapoints: array of objects
      
      // create results and setting the type of results variable to Result interface
      const results: Results = {};

      // take res.locals.instances object and store to allInstances
      const allInstances: SanitizedInstances[] = res.locals.instances;

      // declare start and end time with Date method for 24 hour period
      const startTime: Date = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      const endTime: Date = new Date();

      // create a promises array to be sent later with Promise.all
      // Promise is a build-in object in JS
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
            Period: 3600, // Data points in seconds
            Statistics:
              metric === 'StatusCheckFailed' ||
              metric === 'StatusCheckFailed_Instance' ||
              metric === 'StatusCheckFailed_System'
                ? ['Sum']
                : ['Average'],
          };
          // extract Instance ID
          const instanceId: string = instance.InstanceId;

          const command: GetMetricStatisticsCommand = new GetMetricStatisticsCommand(params);
          const promise: Promise<void> = cloudwatch
            .send(command)
            .then((data: GetMetricStatisticsCommandOutput) => {
              if (!results[instanceId]) {
                results[instanceId] = [];
              }

              const name: string = instance.Name;

              const sumAvg: string =
                metric === 'StatusCheckFailed' ||
                metric === 'StatusCheckFailed_Instance' ||
                metric === 'StatusCheckFailed_System'
                  ? 'Sum'
                  : 'Average';

              const unit: string =
                data.Datapoints && data.Datapoints.length > 0
                  ? sumAvg + ' ' + data.Datapoints[0].Unit
                  : 'no data';

              interface Datapoints {
                Timestamp: Date;
                Value: number;
              }

              const datapoints: Datapoints[] = (data.Datapoints || [])
                .map((datapoint: Datapoint) => ({
                  Timestamp: new Date(datapoint.Timestamp!),
                  Value: sumAvg === 'Sum' ? datapoint.Sum || 0 : datapoint.Average || 0,
                }))
                .sort((a, b) => new Date(a.Timestamp).getTime() - new Date(b.Timestamp).getTime());

              results[instanceId].push({ name, metric, unit, datapoints });
            });
          promises.push(promise);
        }
      }

      // send all promises at the same time
      await Promise.all(promises);

      // store results to res.locals.metrics
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
