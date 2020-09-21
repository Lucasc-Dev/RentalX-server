import { Router } from 'express';
import ProfilesController from '../controllers/ProfileController';

const router = Router();

const profilesController = new ProfilesController();

router.get('/', profilesController.show);

export default router;