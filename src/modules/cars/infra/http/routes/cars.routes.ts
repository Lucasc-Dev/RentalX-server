import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CarsController from '../controllers/CarsController';

const router = Router();

const carsController = new CarsController();

router.use(ensureAuthenticated);

router.post('/', carsController.create);

export default router;