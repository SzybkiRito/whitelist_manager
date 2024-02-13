import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Undefined route. Please check the documentation.',
  });
});

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: 'http://localhost:5000/swagger.json',
    },
    // eslint-disable-next-line @typescript-eslint/comma-dangle
  })
);
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.use(middlewares.sanitizeInput);

export default app;
