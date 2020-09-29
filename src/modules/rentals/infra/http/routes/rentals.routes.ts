import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import RentalsController from '../controllers/RentalsController';

const rentalsController = new RentalsController();

const router = Router();

router.use(ensureAuthenticated);

router.post('/', rentalsController.create);

export default router;