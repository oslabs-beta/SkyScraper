import express from 'express';
import dotenv from 'dotenv';
import { ErrorHandler } from './utils/ErrorHandler';
import exampleRoute from './routes/exampleRouter';
import AWS from 'aws-sdk';

dotenv.config();

const app = express();

const PORT: number =
  process.env.NODE_ENV === 'development'
    ? Number(process.env.DEV_PORT)
    : Number(process.env.PROD_PORT);

app.use('/example', exampleRoute);

app.use(express.json());

const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

// Catch All Handler
app.use('*', (req, res) => {
  res.sendStatus(404);
});

// Global Error Handler
// example error
// return next(new ErrorObject(
// 'Error occured in <middlewareController.middlewareFunction>, <error description>' + JSON.stringify(err),
// <error status code>,
// '<middlewareController.middlewareFunction>: ERROR: Check server logs for details'
// ));
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

export default app;
