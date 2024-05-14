import express, { Request, Response, NextFunction } from 'express';
import exampleController from '../controllers/exampleController.js';

const router = express.Router();

router.get('/', exampleController.exampleMiddleware, (req: Request, res: Response) => {
  res.sendStatus(200);
});

router.get(
  '/getMetricStatistics',
  exampleController.getMetricStatistics,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  },
);

// router.post('/', exampleController.anotherMiddleware, (req: Request, res: Response) => {
//   res.sendStatus(201);
// });

export default router;
