import express, { Request, Response } from 'express';
import ec2Controller from '../controllers/ec2Controller.js';
import cloudController from '../controllers/cloudController.js';
import authController from '../controllers/authController.js';

const router = express.Router();

router.get(
  '/ec2',
  authController.verifyJWT,
  // ec2Controller.getEC2Instances,
  (req: Request, res: Response) => res.status(200).send(res.locals.test),
);

router.get(
  '/stats',
  ec2Controller.getEC2Instances,
  cloudController.getEC2Metrics,
  (req: Request, res: Response) => res.status(200).send(res.locals.metrics),
);

export default router;
