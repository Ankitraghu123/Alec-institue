const express = require('express');
const enquiryController = require('../Controller/EnquiryController');

const router = express.Router();


router.post("/add", enquiryController.ContactProduct);
router.get("/allcourse", enquiryController. ContactDisplay);

router.delete("/coursedelte/:id", enquiryController.  RecordDelete);


module.exports = router;