import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profilesRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import vehiclesRouter from '@modules/vehicles/infra/http/routes/vehicles.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/profile', profilesRouter);
router.use('/sessions', sessionsRouter);
router.use('/vehicles', vehiclesRouter);

export default router;