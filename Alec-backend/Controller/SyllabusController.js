const Course = require("../Module/SyllabusModule");
const imagekit = require("../Utils/imageKit");

const fileUpload = async (file) => {
  const buffer = file.data;

  // Ensure the file has data and a name
  if (!buffer || !file.name) {
    throw new Error("Invalid file data");
  }

  const uploadResponse = await imagekit.upload({
    file: buffer,
    fileName: file.name,
  });

  return uploadResponse.url;
};

const WhatsNewSave = async (req, res) => {
  try {
    const { title, category } = req.body;
    const pdfFile = req.files?.PDFbrochure;

    if (!title || !category || !pdfFile) {
      return res.status(400).json({
        success: false,
        message: "Title, category, and PDF brochure are required",
      });
    }

    const pdfUrl = await fileUpload(pdfFile);

    const course = await Course.create({
      Coursename: title,
      category,
      PDFbrochure: pdfUrl,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });

  } catch (error) {
    console.error("WhatsNewSave error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

const getWhatsNew = async (req, res) => {
  try {
    const courses = await Course.find().populate("category");

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch courses",
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
        error: "WhatsNew entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "WhatsNew entry deleted successfully",
    });

  } catch (error) {
    console.error("WhatsNewDelete error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

// const WhatsNewById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const course = await Course.findById(id).populate("category");

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         error: "WhatsNew entry not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: course,
//     });

//   } catch (error) {
//     console.error("WhatsNewById error:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message || "Internal Server Error",
//     });
//   }
// };

const WhatsNewById = async (req, res) => {
  try {
    const syllabus = await Course.findById(req.params.id).populate('Category');
    if (!syllabus) return res.status(404).json({ message: 'Syllabus not found' });
    res.json(syllabus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCoursesByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id,'sdfgh')
    const courses = await Course.find({ category: id }).populate('category');
    console.log('courses',courses)

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'No courses found for this category' });
    }

    res.json(courses);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
};




module.exports = {
  WhatsNewSave,
  getWhatsNew,
  WhatsNewDelete,
  WhatsNewById,
  getCoursesByCategory
};
