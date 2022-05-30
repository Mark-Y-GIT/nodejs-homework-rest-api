const express = require('express');
const router = express.Router();
const createError = require('../../errors');
const validation = require('../../validation');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (contact) {
      res.json(contact);
      return;
    }

    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = validation.postSchema.validate(req.body);

    if (error) {
      throw createError(
        400,
        (error.message = `missing required ${error.message
          .replace(/"/g, '')
          .replace(/is required/g, 'field')}`),
      );
    }

    const contact = await addContact(req.body);

    if (contact) {
      res.status(201).json(contact);
      return;
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { error } = validation.idSchema.validate(req.params);

    if (error) {
      throw createError(400, error.message.replace(/"/g, ''));
    }

    const { contactId } = req.params;

    const contact = await removeContact(contactId);
    if (contact) {
      res.json({ message: 'contact deleted' });
      return;
    }

    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = validation.updateSchema.validate(req.body);

    if (error) {
      throw createError(400, (error.message = 'missing fields'));
    }

    const { contactId } = req.params;

    const updatedContact = await updateContact(contactId, req.body);

    if (updatedContact) {
      res.json(updatedContact);
      return;
    }

    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
