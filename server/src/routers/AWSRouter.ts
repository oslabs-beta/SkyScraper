import express, { Request, Response, NextFunction } from 'express';
import AWSController from '../controllers/AWSController.js';

const AWSRouter = express.Router();

AWSRouter.get(
  '/ec2',
  AWSController.getEC2Instances,
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send(res.locals.instances);
  },
);

AWSRouter.get(
  '/stats',
  AWSController.getEC2Instances,
  AWSController.getMetricStatistics,
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send(res.locals.metrics);
  },
);

export default AWSRouter;
