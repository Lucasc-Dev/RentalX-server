import { Router } from 'express';

import ProfilesController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();

const profilesController = new ProfilesController();

router.use(ensureAuthenticated);

router.get('/', profilesController.show);

export default router;