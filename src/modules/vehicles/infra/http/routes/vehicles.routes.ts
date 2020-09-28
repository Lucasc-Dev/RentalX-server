import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import VehiclesController from '../controllers/VehiclesController';
import VehicleImageController from '../controllers/VehicleImageController';

const vehiclesController = new VehiclesController();
const vehicleImageController = new VehicleImageController();

const router = Router();
const upload = multer(uploadConfig.multer);

router.use(ensureAuthenticated);

router.get('/', vehiclesController.index);
router.post('/', vehiclesController.create);

router.patch('/image/:vehicle_id', upload.single('image'), vehicleImageController.update);

export default router;