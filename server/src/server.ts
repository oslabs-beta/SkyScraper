import express from 'express';
import dotenv from 'dotenv';
import { ErrorHandler } from './utils/ErrorHandler.js';
import exampleRoute from './routes/exampleRouter.js';
import authRoute from './routes/authRouter.js';

dotenv.config();

const app = express();

const PORT = process.env.NODE_ENV === 'development' ? process.env.DEV_PORT : process.env.PROD_PORT;

app.use(express.json());
app.use('/', authRoute);
app.use('/', exampleRoute);

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
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;
