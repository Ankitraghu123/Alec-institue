const express = require("express");
const route =express.Router();
const QueryController = require("../Controller/MainController");


route.post("/create", QueryController.CourseSave);
route.get("/display", QueryController.getAllCourse);
route.delete("/:id", QueryController.PreDelete);
route.get("/maintestseries/:id", QueryController.getCourseWithTestModules);



// route.get("/display", QueryController.Successerdisplay);
// route.delete("/:id", QueryController. StoryDelete);


module.exports =route;