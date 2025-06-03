const express = require("express");
const route =express.Router();
const CourseController = require("../Controller/CourseController");


route.post("/course", CourseController.CourseSave);
route.get("/allcourse", CourseController.getAllCourse);


route.get("/:id", CourseController.getProductById);

route.delete("/coursedelte/:id", CourseController. CourseDelete);
route.get("/courses/:id", CourseController.getCourseById);
route.get("/courses/category/:id", CourseController.getCoursesByCategory);







module.exports =route;