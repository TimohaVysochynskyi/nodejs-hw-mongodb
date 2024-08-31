import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import authRouter from './routers/auth.js';
import contactRouter from './routers/contacts.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

export const setupServer = () => {
  const PORT = Number(process.env.PORT);

  const app = express();

  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cors());
  app.use(cookieParser());

  app.use('/auth', authRouter);
  app.use('/contacts', contactRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
