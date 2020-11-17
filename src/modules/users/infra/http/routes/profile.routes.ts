import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import multerConfig from '@config/upload';

import AvatarController from '../controllers/AvatarController';
import ProfilesController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();
const upload = multer(multerConfig.multer);

const profilesController = new ProfilesController();
const avatarController = new AvatarController();

router.use(ensureAuthenticated);

router.get('/', profilesController.show);
router.put(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().min(5).max(50),
            email: Joi.string().email(),
            oldPassword: Joi.string(),
            password: Joi.string().min(5).max(30),
        }
    }),
    profilesController.update,
);
router.patch('/avatar', upload.single('avatar'), avatarController.update);

export default router;