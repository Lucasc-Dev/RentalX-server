import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from '@config/upload';
import ErrorHandler from './middlewares/ErrorHandler';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use('/files', express.static(uploadConfig.multer.uploadFolder));
app.use(express.json());
app.use(routes);

app.use(ErrorHandler);

app.listen(3333, () => {
    console.log('Server running on port 3333');
});