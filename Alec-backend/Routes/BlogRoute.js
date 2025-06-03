const express = require("express");
const route =express.Router();
const CourseController = require("../Controller/BlogController");


route.post("/create", CourseController.BlogSave);
route.get("/display", CourseController.BlogDisplayAll);
route.delete("/:id", CourseController.BlogDelete);
route.get("/:id", CourseController.getProductById);












module.exports =route;