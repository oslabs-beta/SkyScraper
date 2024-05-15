import express, { Request, Response, NextFunction } from 'express';
import exampleController from '../controllers/exampleController.js';

const router = express.Router();

router.get('/ec2', exampleController.getEC2, (req: Request, res: Response) => {
  res.status(200).send(res.locals.instances);
});

router.get(
  '/getMetricStatistics',
  exampleController.getMetricStatistics,
  (req: Request, res: Response) => {
    res.status(200).send(res.locals.cpuUsageData);
  },
);

// router.post('/', exampleController.anotherMiddleware, (req: Request, res: Response) => {
//   res.sendStatus(201);
// });

export default router;
