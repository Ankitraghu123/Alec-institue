const JudgementModel = require('../Module/JudementModule'); // fixed naming consistency
const imagekit = require('../Utils/imageKit'); // make sure you import your imagekit instance properly

const judegemntcreate = async (req, res) => {
  try {
    const {
      title,
      subTitle,
      description,
      lastDate,
      publicerName,
      category,
      size, // assuming you want to handle size as in your original code, though your schema doesn't have it
    } = req.body;

    // Parse size if needed (you may remove if not used in schema)
    let parsedSize;
    try {
      parsedSize = typeof size === 'string' ? JSON.parse(size) : size;
    } catch (err) {
      return res.status(400).json({ error: 'Invalid size format' });
    }

    // Handle image uploads
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

    // Parse and validate lastDate
    const parsedLastDate = new Date(lastDate);
    if (lastDate && isNaN(parsedLastDate.getTime())) {
      return res.status(400).json({ error: 'Invalid lastDate format' });
    }

    // Create Judgement document
    const judgement = await JudgementModel.create({
      title,
      subTitle,
      description,
      lastDate: parsedLastDate || undefined,
      category,
      publicerName,
      images: uploadedImages,
      // add size if you want to save it and schema supports it
    });

    res.status(201).json(judgement);
  } catch (error) {
    console.error('judegemntcreate error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};



const judegementdiplay= async (req, res) => {
    try {
        const products = await JudgementModel.find().populate("category");
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: error.message });
    }
};



const RecordDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEnquiry = await JudgementModel.findByIdAndDelete(id);

        if (!deletedEnquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully",
            data: deletedEnquiry
        });
    } catch (error) {
        console.error("Error deleting enquiry:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete enquiry",
            error: error.message
        });
    }
};


const getProductById = async (req, res) => {
  try {
    const product = await JudgementModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await JudgementModel.findById(req.params.id).populate("category");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = { 
    judegemntcreate,
    judegementdiplay,
    RecordDelete,
    getProductById,
    getCourseById

};
