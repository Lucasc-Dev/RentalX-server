import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profilesRouter from '@modules/users/infra/http/routes/profile.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/profile', profilesRouter);

export default router;