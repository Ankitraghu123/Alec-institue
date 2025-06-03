const express = require('express');
const enquiryController = require('../Controller/CallbackPopUpController');

const router = express.Router();


router.post("/add", enquiryController.CallbackPopUp);
router.get("/allcallback", enquiryController. ContactDisplay);


router.delete("/allcallback/:id", enquiryController.RecordDelete);

module.exports = router;