import { Router } from 'express';

import AvatarController from '../controllers/AvatarController';
import ProfilesController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();

const profilesController = new ProfilesController();
const avatarController = new AvatarController();

router.use(ensureAuthenticated);

router.get('/', profilesController.show);
router.put('/', profilesController.update);
router.patch('/avatar', avatarController.update);

export default router;