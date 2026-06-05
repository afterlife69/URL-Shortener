import { Router } from 'express';
import validateUrl from '../middlewares/urlValidation.middleware.js';
import { transformUrl, getId } from '../controllers/api.controller.js';
import validateId from '../middlewares/idValidation.middleware.js';

const router = Router();

router.post('/transform', validateUrl, transformUrl);
router.get('/:id', validateId, getId);

export default router;