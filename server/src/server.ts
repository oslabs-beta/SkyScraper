import express from 'express';
import dotenv from 'dotenv/config';
import { ErrorHandler } from './utils/ErrorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import router from './routers/router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.use('/api', router);

// Catch All Handler
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Global Error Handler
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
