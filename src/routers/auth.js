import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

import { registerUserSchema, loginUserSchema } from '../validation/auth.js';

import {
  registerUserController,
  loginUserController,
  refreshUserController,
  logoutUserController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/refresh', ctrlWrapper(refreshUserController));
router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
