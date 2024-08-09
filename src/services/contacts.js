import { ContactCollection } from '../models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);
  return contact;
};

export const addContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const contact = await ContactCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    { new: true, includeResultMetadata: false, ...options },
  );

  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactCollection.findOneAndDelete({ _id: contactId });

  return contact;
};
