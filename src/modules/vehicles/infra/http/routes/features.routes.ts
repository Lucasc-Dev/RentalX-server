import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import FeaturesController from '../controllers/FeaturesController';

const router = Router();

const featuresController = new FeaturesController();

router.use(ensureAuthenticated);

router.post('/', featuresController.create);

export default router;