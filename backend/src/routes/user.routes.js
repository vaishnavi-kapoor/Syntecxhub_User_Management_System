import { Router } from 'express';
import { deleteProfile, getProfile, updateProfile } from '../controllers/user.controller.js';
import { requireAuth, requireOwnership } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/:id', requireAuth, requireOwnership, asyncHandler(getProfile));
router.put('/:id', requireAuth, requireOwnership, asyncHandler(updateProfile));
router.delete('/:id', requireAuth, requireOwnership, asyncHandler(deleteProfile));

export default router;
