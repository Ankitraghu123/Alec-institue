const Course =  require( "../Module/MainModule")


const imagekit = require("../Utils/imageKit");



const CourseSave = async (req, res) => {
  try {
    const {
 
       Price, 
      Durations, 
      testmodule,
      CourseDescription,
      LastDate,
      size,
      category, // ✅ Destructure category
    } = req.body;

    // ✅ Parse JSON string if needed
    let parsedSize;
    try {
      parsedSize = typeof size === 'string' ? JSON.parse(size) : size;
    } catch (err) {
      return res.status(400).json({ error: 'Invalid size format' });
    }

    // ✅ Handle image uploads only if images are provided
    const uploadedImages = [];
    const filesRaw = req.files?.images;

    if (filesRaw) {
      const files = Array.isArray(filesRaw) ? filesRaw : [filesRaw];

      for (let file of files) {
        const buffer = file.data;
        const uploadResponse = await imagekit.upload({
          file: buffer,
          fileName: file.name,
        });
        uploadedImages.push(uploadResponse.url);
      }
    }

    // ✅ Parse and validate LastDate
    const parsedLastDate = new Date(LastDate);
    if (isNaN(parsedLastDate)) {
      return res.status(400).json({ error: 'Invalid LastDate format' });
    }

    // ✅ Create course
    const course = await Course.create({
        Price, 
      Durations, 
      URL,
      CourseDescription,
      testmodule,
      category,
      LastDate: parsedLastDate,
      size: parsedSize,
      category,
      images: uploadedImages,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('CourseSave error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};



const getAllCourse = async (req, res) => {
    try {
        const products = await Course.find().populate("category");
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: error.message });
    }
};


const PreDelete = async(req, res)=>{

     const {id} = req.params;
   await Course.findByIdAndDelete(id);

    res.status(200).send("Task deleted")
}


const getCourseWithTestModules = async (req, res) => {
  try {
    const {id} = req.params;
    const course = await Course.find({category: id})
      console.log(course,"course") 

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (err) {
    console.error("Error in getCourseWithTestModules:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};






module.exports = {

     CourseSave,
     getAllCourse,
     PreDelete,
     getCourseWithTestModules

     
}