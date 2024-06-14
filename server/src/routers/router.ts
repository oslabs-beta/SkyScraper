import express, { Request, Response } from 'express';
import authController from '../controllers/authController.js';
import ec2Controller from '../controllers/ec2Controller.js';
import cloudController from '../controllers/cloudController.js';

const router = express.Router();

router.get(
  '/ec2',
  authController.verifyJWT,
  authController.getIdentityID,
  authController.getTemporaryCredentials,
  ec2Controller.getEC2Instances,
  (req: Request, res: Response) => res.status(200).send(res.locals.instances),
);

router.get(
  '/stats',
  authController.verifyJWT,
  authController.getIdentityID,
  authController.getTemporaryCredentials,
  ec2Controller.getEC2Instances,
  cloudController.getEC2Metrics,
  (req: Request, res: Response) => res.status(200).send(res.locals.metrics),
);

export default router;
