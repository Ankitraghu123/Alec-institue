const express = require('express');
const ContactController = require('../Controller/ContactController');

const router = express.Router();

router.post('/add', ContactController.ContactProduct);
router.get('/allcontact', ContactController.ContactDisplay);
router.delete('/alldelete/:id', ContactController.RecordDelete);






module.exports = router;