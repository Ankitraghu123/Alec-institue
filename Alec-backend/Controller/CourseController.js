const UserModel = require("../Module/QueryModule");
const Course =  require( "../Module/Coursemodule")
const imagekit = require("../Utils/imageKit");

const Querysave = async(req, res)=>{
    const {Name, Phone,State, Medium,  message } = req.body;
      
    try {
         const User= await UserModel.create({
            Name:Name,
            Phone:Phone,
            State:State,
            Medium:Medium,
           message:message,
         
         })

         res.status(200).send("user succesfully registered!");
    } catch (error) {
          console.log(error);
    }
}

const getAllQuery = async (req, res) => {
    try {
        const products = await UserModel.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: error.message });
    }
};



const CourseSave = async (req, res) => {
  try {
    const {
      Seat,
      Semester,
      Coursename,
      StateCourse,
      Price,
      Instructor,
      Durations,
      Lessons,
      URL,
      TotalStudent,
      language,
      Certification,
      CourseDescription,
      InstructorCourse,
      Review,
      TrainerName,
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
      Seat,
      Semester,
      Coursename,
      StateCourse,
      Price,
      Instructor,
      Durations,
      Lessons,
      URL,
      TotalStudent,
      language,
      Certification,
      CourseDescription,
      InstructorCourse,
      Review,
      TrainerName,
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

const CourseDelete = async(req, res)=>{

     const {id} = req.params;
   await Course.findByIdAndDelete(id);

    res.status(200).send("Task deleted")
}


const QueryDelete = async(req, res)=>{

     const {id} = req.params;
   await UserModel.findByIdAndDelete(id);

    res.status(200).send("Task deleted")
}




const getAllCourse = async (req, res) => {
    try {
        const products = await Course.find().populate("category");
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
  try {
    const product = await Course.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get course by ID
const getCourseById = async (req, res) => {
  try {
    console.log(req.params,"req.params")

    const course = await Course.findById(req.params.id).populate("category");
    console.log(course)
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get related courses by category
// const getCoursesByCategory = async (req, res) => {
//   try {
//     const { category } = req.query;

//     if (!category) {
//       return res.status(400).json({ message: "Category ID is required" });
//     }

//     const courses = await Course.find({ category });
//     res.status(200).json(courses);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// courseController.js



const getCoursesByCategory = async (req, res) => {
   try {
    const courses = await Course.find({ category: req.params.id });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
  


module.exports = {
    Querysave,
     CourseSave,
     getAllCourse,
     CourseDelete,
     getAllQuery,
     QueryDelete,
     getProductById ,
     getCourseById,
     getCoursesByCategory,
     
}