import { Request, Response, NextFunction } from 'express';
import { fetchEC2Instances } from '../services/ec2.service.js';
import ErrorObject from '../utils/ErrorObject.js';
import type { ec2Controller } from '../utils/types.js';

const ec2Controller: ec2Controller = {
  getEC2Instances: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const credentials = res.locals.credentials;
      const region = process.env.REGION;

      res.locals.instances = await fetchEC2Instances(credentials, region);
      next();
    } catch (err) {
      next(
        err instanceof Error
          ? new ErrorObject(`The Error: ${err.message}`, 500, 'Error in EC2Instances middleware')
          : new ErrorObject('the error', 500, 'the error'),
      );
    }
  },
};

export default ec2Controller;
