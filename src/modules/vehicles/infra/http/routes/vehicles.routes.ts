import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import VehiclesController from '../controllers/VehiclesController';

const vehiclesController = new VehiclesController();

const router = Router();

router.use(ensureAuthenticated);

router.get('/', vehiclesController.index);
router.post('/', vehiclesController.create);

export default router;