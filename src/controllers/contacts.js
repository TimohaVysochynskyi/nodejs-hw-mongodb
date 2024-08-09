import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

// GET
export const getAllContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  res.status(200).send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

// POST
export const addContactController = async (req, res, next) => {
  const contact = await addContact(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

// PATCH
export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

// DELETE
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.body);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send();
};
