import { Router } from 'express';
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
router.put('/', profilesController.update);
router.patch('/avatar', upload.single('avatar'), avatarController.update);

export default router;