import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts/', ctrlWrapper(addContactController));

router.patch('/contacts/:contactId', ctrlWrapper(updateContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
