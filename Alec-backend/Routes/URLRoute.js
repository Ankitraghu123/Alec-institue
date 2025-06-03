const express = require("express");
const route =express.Router();
const URLController = require("../Controller/URLController");


route.post("/create", URLController.CourseSave );
route.get("/display", URLController.ContactDisplay);
route.delete('/:id', URLController.URLDeleted);




  



module.exports =route;