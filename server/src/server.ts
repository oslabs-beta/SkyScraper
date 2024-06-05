import express from 'express';
import dotenv from 'dotenv';
import { ErrorHandler } from './utils/ErrorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import router from './routers/router.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.NODE_ENV === 'development' ? process.env.DEV_PORT : process.env.PROD_PORT;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../dist/client')));

app.use('/api', router);

// Catch All Handler
app.use('*', (req, res) => {
  res.sendStatus(404);
});

// Global Error Handler
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
