const express = require('express');
const contactsRouter = express.Router();
const {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContactById,
  favoriteContactToggle,
} = require('../../controllers');
const {
  createContactValidation,
  updateContactByIdValidation,
  deleteContactValidation,
  favoriteContactToggleValidation,
} = require('../../validation/validation');

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:contactId', getContactById);

contactsRouter.post('/', createContactValidation, createContact);

contactsRouter.delete('/:contactId', deleteContactValidation, deleteContact);

contactsRouter.put(
  '/:contactId',
  updateContactByIdValidation,
  updateContactById,
);

contactsRouter.patch(
  '/:contactId/favorite',
  favoriteContactToggleValidation,
  favoriteContactToggle,
);

module.exports = contactsRouter;
