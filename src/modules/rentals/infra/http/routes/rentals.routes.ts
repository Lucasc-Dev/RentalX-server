import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import RentalsController from '../controllers/RentalsController';

const rentalsController = new RentalsController();

const router = Router();

router.use(ensureAuthenticated);

router.get(
    '/', 
    rentalsController.index,
);
router.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            vehicle_id: Joi.string().uuid().required(),
            start_date: Joi.date().required(),
            end_date: Joi.date().required(),
        }
    }),
    rentalsController.create,
);

export default router;