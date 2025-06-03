const express = require('express');
const enquiryController = require('../Controller/SyllabusController');
const upload = require("../middlewares/multer");
const router = express.Router();


router.post('/create',  enquiryController.WhatsNewSave);
router.get('/alldisplay', enquiryController.getWhatsNew);
router.delete('/delete/:id', enquiryController.WhatsNewDelete);
// router.get('/:id', enquiryController.WhatsNewById);
router.get('/category/:id', enquiryController.getCoursesByCategory);

module.exports = router;