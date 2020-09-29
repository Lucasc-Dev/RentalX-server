import { Router } from 'express';

import RentalsController from '../controllers/RentalsController';

const rentalsController = new RentalsController();

const router = Router();

router.post('/', rentalsController.create);

export default router;