import express, { Request, Response, NextFunction } from 'express';
import AWSController from '../controllers/AWSController.js';
import { requiresAuth } from 'express-openid-connect';

const AWSRouter = express.Router();

AWSRouter.get(
  '/ec2',
  requiresAuth(),
  AWSController.getEC2Instances,
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send(res.locals.instances);
  },
);

AWSRouter.get(
  '/stats',
  requiresAuth(),
  AWSController.getEC2Instances,
  AWSController.getMetricStatistics,
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send(res.locals.metrics);
  },
);

export default AWSRouter;
