import express from 'express';
import dotenv from 'dotenv';
import { ErrorHandler } from './utils/ErrorHandler';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

dotenv.config();

import AWSRouter from './routers/AWSRouter';
import authRouter from './routers/authRouter';

const app = express();

const PORT = process.env.NODE_ENV === 'development' ? process.env.DEV_PORT : process.env.PROD_PORT;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../dist/client')));

app.use('/', authRouter);
app.use('/api', AWSRouter);

// Catch All Handler for React App
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../dist/client/index.html'));
// });

// Catch All Handler
app.use('*', (req, res) => {
  res.sendStatus(404);
});

// Global Error Handler
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;
