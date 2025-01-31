import {
  EC2Client,
  DescribeInstancesCommand,
  DescribeInstancesCommandOutput,
  Instance,
  Reservation,
} from '@aws-sdk/client-ec2';
import ErrorObject from '../utils/ErrorObject.js';
import type { SanitizedInstances } from '../utils/types.js';

export const fetchEC2Instances = async (
  credentials: any,
  region: string | undefined,
): Promise<SanitizedInstances[]> => {
  const ec2 = new EC2Client({ region, credentials });
  const command = new DescribeInstancesCommand({});

  const data: DescribeInstancesCommandOutput = await ec2.send(command);

  if (!data.Reservations) {
    throw new ErrorObject('No reservation found', 500, 'No reservation found');
  }

  const flattenedInstances: Instance[] = data.Reservations.map((r: Reservation) => r.Instances)
    .flat()
    .filter((instance: Instance | undefined): instance is Instance => instance !== undefined);

  return flattenedInstances.map((instance: Instance): SanitizedInstances => {
    const nameTag = instance.Tags?.find((tag) => tag.Key === 'Name');
    return {
      InstanceId: instance.InstanceId ?? '',
      InstanceType: instance.InstanceType ?? '',
      Name: nameTag?.Value ?? '',
      State: instance.State?.Name ?? '',
    };
  });
};
