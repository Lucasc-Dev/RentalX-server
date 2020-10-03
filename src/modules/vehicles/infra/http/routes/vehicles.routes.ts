import { Router } from 'express';
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
router.post('/', vehiclesController.create);
router.get('/:vehicle_id', vehiclesController.show);
router.put('/:vehicle_id', vehiclesController.update);
router.delete('/:vehicle_id', vehiclesController.delete);
router.post('/:vehicle_id/:feature_id', vehicleFeaturesController.create);

router.patch('/image/:vehicle_id', upload.single('image'), vehicleImageController.update);

export default router;