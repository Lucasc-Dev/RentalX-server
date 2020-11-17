import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from '@config/upload';
import ErrorHandler from './middlewares/ErrorHandler';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use('/files', express.static(uploadConfig.multer.uploadFolder));
app.use(express.json());
app.use(routes);

app.use(errors());

app.use(ErrorHandler);

app.listen(3333, () => {
    console.log('Server running on port 3333');
});