const express = require("express");
const route =express.Router();
const QueryController = require("../Controller/CourseController");


route.post("/create", QueryController.Querysave);
route.get("/display", QueryController.getAllQuery);
route.delete("/allquerydelete/:id", QueryController.QueryDelete);















module.exports =route;