import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

// GET
export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const userId = req.user._id;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId,
  });

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

  if (contact.userId.toString() !== req.user._id.toString()) {
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
  const userId = req.user._id;

  const contact = await addContact(req.body, userId);

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
