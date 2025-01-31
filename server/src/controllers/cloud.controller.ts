import { Request, Response, NextFunction } from 'express';
import { fetchEC2Metrics } from '../services/cloudService.js';
import ErrorObject from '../utils/ErrorObject.js';
import type { cloudController, SanitizedInstances } from '../utils/types.js';

const cloudController: cloudController = {
  getEC2Metrics: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const instances = res.locals.instances as SanitizedInstances[];
      const credentials = res.locals.credentials;
      const region = process.env.REGION;

      res.locals.metrics = await fetchEC2Metrics(instances, credentials, region);
      next();
    } catch (err) {
      next(
        err instanceof Error
          ? new ErrorObject(
              `Error in getMetrics middleware: ${err.message}`,
              500,
              'Error in getMetrics middleware',
            )
          : new ErrorObject('the error', 500, 'the error'),
      );
    }
  },
};

export default cloudController;
