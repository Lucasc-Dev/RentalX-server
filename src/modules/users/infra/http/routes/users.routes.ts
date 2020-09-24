import { Router } from 'express';

import AvatarController from '../controllers/AvatarController';
import UsersController from '../controllers/UsersController';

const router = Router();

const usersController = new UsersController();
const avatarController = new AvatarController();

router.post('/', usersController.create);

export default router;