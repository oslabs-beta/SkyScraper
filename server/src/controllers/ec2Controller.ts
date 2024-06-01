import type { ec2Controller, SanitizedInstances } from '../utils/types.js';
import ErrorObject from '../utils/ErrorObject.js';
import {
  EC2Client, // EC2Client is a constructor function that has methods that interact with AWS API
  DescribeInstancesCommand,
  DescribeInstancesCommandOutput,
  Instance,
  Reservation,
} from '@aws-sdk/client-ec2';

const ec2Controller: ec2Controller = {
  getEC2Instances: (req, res, next) => {
    void (async () => {
      try {
        // create new ec2 client with credentials included
        const ec2: EC2Client = new EC2Client({
          region: process.env.REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
          },
        });

        // create new command to describe instances, DescibeiIstancesCommand is a class object which contains a contrustor w/ a default value passed in as a n object in the contructor portion
        // invoke describeInstancesCommand and store to command
        // command object has a middleware itself!!!!!
        const command: DescribeInstancesCommand = new DescribeInstancesCommand({});

        // the ec2 client sends a promise and the param is the command
        // the command object then sends an HTTPS request via its own middleware and returns a promise object
        // when resolved, the data is stored as the return

        const data: DescribeInstancesCommandOutput = await ec2.send(command);

        // checks if data is undefined, returns 404 error 'no reservations found'
        if (!data.Reservations) {
          next(new ErrorObject('no reservation found', 500, 'no reservation found'));
          return;
        }

        // flatten data
        const flattedReservation: Instance[] = data.Reservations.map(
          (r: Reservation) => r.Instances,
        )
          .flat()
          .filter((instance: Instance | undefined) => instance !== undefined) as Instance[];

        // map and sanitize flattedReservation array
        const sanitizedInstances: SanitizedInstances[] = flattedReservation.map(
          (instance: Instance): SanitizedInstances => {
            const nameTag = instance.Tags?.find((tag) => tag.Key === 'Name');
            return {
              InstanceId: instance.InstanceId ?? '',
              InstanceType: instance.InstanceType ?? '',
              Name: nameTag?.Value ?? '',
              State: instance.State?.Name ?? '',
            };
          },
        );

        // store sanitizedInstances into res.locals.instances
        res.locals.instances = sanitizedInstances;
        next();
        return;
      } catch (err) {
        if (err instanceof Error) {
          next(
            new ErrorObject(
              `The Error: ${err.message}`,
              500,
              'Error in try catch for EC2Instances middleware',
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

export default ec2Controller;
