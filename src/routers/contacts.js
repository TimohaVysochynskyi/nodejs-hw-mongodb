import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import {
  addContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = Router();

router.use('/', authenticate);

router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(addContactSchema),
  ctrlWrapper(addContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
