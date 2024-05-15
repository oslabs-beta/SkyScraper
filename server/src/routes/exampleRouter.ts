import express, { Request, Response, NextFunction } from 'express';
import exampleController from '../controllers/exampleController.js';

const router = express.Router();

router.get('/ec2', exampleController.getEC2Instances, (req: Request, res: Response) => {
  res.status(200).send(res.locals.instances);
});

router.get('/stats', exampleController.getMetricStatistics, (req: Request, res: Response) => {
  res.status(200).send(res.locals.cpuUsageData);
});

export default router;
