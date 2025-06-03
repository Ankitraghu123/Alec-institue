const express = require("express");
const route =express.Router();
const QueryController = require("../Controller/WhyChooseController");


route.post("/create", QueryController.SuccesserStudent);
route.get("/display", QueryController.SuccesserDisplay);
route.delete("/:id", QueryController. StoryDelete);


module.exports =route;