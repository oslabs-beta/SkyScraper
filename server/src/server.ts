import express from 'express';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
import router from './routers/router.js';
import { fileURLToPath } from 'url';
import { ErrorHandler } from './utils/ErrorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.NODE_ENV === 'production' ? process.env.PROD_PORT : 8080;

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
