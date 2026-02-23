import { Router } from 'express';
import { register, signin } from '../controllers/auth.controller.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/register', asyncHandler(register));
router.post('/signin', asyncHandler(signin));

export default router;
