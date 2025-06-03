const express = require("express");
const route =express.Router();
const judegementConrtoller = require("../Controller/JudementController");


route.post("/create", judegementConrtoller.judegemntcreate);
route.get("/display", judegementConrtoller.judegementdiplay);
route.get("/course/:id", judegementConrtoller.getProductById);
route.get("/course/category/:id", judegementConrtoller.getCourseById);


route.delete("/:id", judegementConrtoller.RecordDelete);
















module.exports =route;