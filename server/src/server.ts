// import express from 'express';
// import dotenv from 'dotenv';
// import { ErrorHandler } from './utils/ErrorHandler.js';
// import AWSRouter from './routers/AWSRouter.js';
// import path from 'path';

// dotenv.config();

// const app = express();

// const PORT = process.env.NODE_ENV === 'development' ? process.env.DEV_PORT : process.env.PROD_PORT;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, '../../dist/client')));

// app.use('/', AWSRouter);

// // Catch All Handler
// app.use('*', (req, res) => {
//   res.sendStatus(404);
// });

// // Global Error Handler
// // example error
// // return next(new ErrorObject(
// // 'Error occured in <middlewareController.middlewareFunction>, <error description>' + JSON.stringify(err),
// // <error status code>,
// // '<middlewareController.middlewareFunction>: ERROR: Check server logs for details'
// // ));
// app.use(ErrorHandler);

// app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });

// export default app;

import express from 'express';
import dotenv from 'dotenv';
import { ErrorHandler } from './utils/ErrorHandler.js';
import AWSRouter from './routers/AWSRouter.js';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.NODE_ENV === 'development' ? process.env.DEV_PORT : process.env.PROD_PORT;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../dist/client')));

app.use('/api', AWSRouter);

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
