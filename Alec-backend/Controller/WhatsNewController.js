const Course = require("../Module/WhatsModule");
const imagekit = require("../Utils/imageKit");

const fs = require("fs");
const path = require("path");

const fileUpload = async(file)=>{
 const buffer = file.data;
 const uploadResponse = await imagekit.upload({
   file: buffer,
   fileName: file.name,
 });
 return uploadResponse.url;
}

const WhatsNewSave = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    console.log(req.body);

    // Handle image uploads
    const imageFiles = req.files?.images|| [];
    const pdfFile = req.files?.PDFbrochure;
    console.log(pdfFile);
    console.log(imageFiles);

     
    const pdfUrl = await fileUpload(pdfFile);
    const imageUrls = await fileUpload(imageFiles);
     
    console.log(imageUrls);
    console.log(pdfUrl);

    // Create new Course
    const course = await Course.create({
      Coursename:title,
      CourseDescription:description,
      category,
      images: imageUrls,
      PDFbrochure: pdfUrl
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course
    });

  } catch (error) {
    console.error("WhatsNewSave error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error"
    });
  }
};

const getWhatsNew = async (req, res) => {
  try {
    const courses = await Course.find().populate("category");
    res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch courses"
    });
  }
};
const WhatsNewDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'WhatsNew entry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'WhatsNew entry deleted successfully',
    });
  } catch (error) {
    console.error('WhatsNewDelete error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
};

const WhatsNewById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate('category');

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'WhatsNew entry not found',
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('WhatsNewById error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error',
    });
  }
};

module.exports = {
  WhatsNewSave,
  getWhatsNew,
  WhatsNewDelete,
  WhatsNewById,
};