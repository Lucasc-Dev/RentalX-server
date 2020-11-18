import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import VehiclesController from '../controllers/VehiclesController';
import VehicleImageController from '../controllers/VehicleImageController';
import VehicleFeaturesController from '../controllers/VehicleFeaturesController';

const vehiclesController = new VehiclesController();
const vehicleImageController = new VehicleImageController();
const vehicleFeaturesController = new VehicleFeaturesController();

const router = Router();
const upload = multer(uploadConfig.multer);

router.use(ensureAuthenticated);

router.get('/', vehiclesController.index);
router.get('/:vehicle_id', vehiclesController.show);
router.post(
    '/', 
    upload.array('images'),
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required().min(1).max(30),
            brand: Joi.string().required().min(1).max(30),
            model: Joi.string().required().min(1).max(30),
            plate: Joi.string().required().min(4).max(8),
            daily_price: Joi.number().required(),
            fuel: Joi.string().required().max(20),
            gear: Joi.string().required().max(20),
        }
    }),
    vehiclesController.create,
);
router.put(
    '/:vehicle_id', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required().min(1).max(30),
            brand: Joi.string().required().min(1).max(30),
            model: Joi.string().required().min(1).max(30),
            plate: Joi.string().required().min(4).max(8),
            daily_price: Joi.number().required(),
            fuel: Joi.string().required().max(20),
            gear: Joi.string().required().max(20),
        }
    }),
    vehiclesController.update,
);
router.post('/:vehicle_id/:feature_id', vehicleFeaturesController.create);
router.delete('/:vehicle_id', vehiclesController.delete);
router.patch('/image/:vehicle_id', upload.single('image'), vehicleImageController.update);

export default router;