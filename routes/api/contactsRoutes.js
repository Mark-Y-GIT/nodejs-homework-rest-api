const express = require('express');
const contactsRouter = express.Router();
const {
  contactsController: {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContactById,
    favoriteContactToggle,
  },
} = require('../../controllers/');
const {
  contactsValidation: {
    createContactValidation,
    updateContactByIdValidation,
    deleteContactValidation,
    favoriteContactToggleValidation,
  },
  userValidation: { auth },
} = require('../../middleware');

contactsRouter.all('/', auth);
contactsRouter.all('/:contactId', auth);
contactsRouter.all('/:contactId/favorite', auth);

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
