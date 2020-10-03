import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FeaturesController from '../controllers/FeaturesController';

const router = Router();
const upload = multer(uploadConfig.multer);

const featuresController = new FeaturesController();

router.use(ensureAuthenticated);

router.post('/', featuresController.create);

router.patch('/:feature_id', upload.single('icon'), featuresController.update);

export default router;