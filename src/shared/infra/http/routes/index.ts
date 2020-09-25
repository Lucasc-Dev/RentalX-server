import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profilesRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import carsRouter from '@modules/cars/infra/http/routes/cars.routes';

const router = Router();

router.use('/cars', carsRouter);
router.use('/users', usersRouter);
router.use('/profile', profilesRouter);
router.use('/sessions', sessionsRouter);

export default router;