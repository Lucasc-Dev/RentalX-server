import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FeaturesController from '../controllers/FeaturesController';

const router = Router();
const upload = multer(uploadConfig.multer);

const featuresController = new FeaturesController();

router.use(ensureAuthenticated);

router.post(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required().min(2).max(30),
            description: Joi.string().required().min(2).max(30),
        }
    }),
    featuresController.create,
);

router.patch('/:feature_id', upload.single('icon'), featuresController.update);

export default router;