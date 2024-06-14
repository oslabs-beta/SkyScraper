import {
  EC2Client,
  DescribeInstancesCommand,
  DescribeInstancesCommandOutput,
  Instance,
  Reservation,
} from '@aws-sdk/client-ec2';
import type { ec2Controller, SanitizedInstances } from '../utils/types.js';
import ErrorObject from '../utils/ErrorObject.js';

const ec2Controller: ec2Controller = {
  getEC2Instances: (req, res, next) => {
    void (async () => {
      try {
        const ec2: EC2Client = new EC2Client({
          region: process.env.REGION,
          credentials: res.locals.credentials,
        });

        const command: DescribeInstancesCommand = new DescribeInstancesCommand({});

        const data: DescribeInstancesCommandOutput = await ec2.send(command);

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

        res.locals.instances = sanitizedInstances;

        next();
        return;
      } catch (err) {
        if (err instanceof Error) {
          next(
            new ErrorObject(`The Error: ${err.message}`, 500, 'Error in EC2Instances middleware'),
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
