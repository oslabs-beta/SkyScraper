import express, { Request, Response, NextFunction } from 'express';
import exampleController from '../controllers/exampleController.js';
import { uptime } from 'process';

const router = express.Router();

router.get('/ec2', exampleController.getEC2Instances, (req: Request, res: Response) => {
  res.status(200).send(res.locals.instances);
});

router.get('/stats', exampleController.getMetricStatistics, (req: Request, res: Response) => {
  res.status(200).send({
    cpuUsage: res.locals.cpuUsage,
    diskUsage: res.locals.diskUsage,
    // ramUsage: res.locals.ramUsage,
    // uptime: res.locals.uptime,
    // downtime: res.locals.downtime,
  });
});

export default router;
