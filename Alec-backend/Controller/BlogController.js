const Banner = require("../Module/BlogModule");
const imagekit = require("../Utils/imageKit");

const BlogSave = async (req, res) => {
  try {
    const {
      Blog,
      author,
      URL,
      title,
      excerpt,
      LastDate,
      Description
    } = req.body;

    // Handle image uploads
    const uploadedImages = [];
    const filesRaw = req.files?.images;

    if (filesRaw) {
      const files = Array.isArray(filesRaw) ? filesRaw : [filesRaw];

      for (const file of files) {
        const buffer = file.data;

        const uploadResponse = await imagekit.upload({
          file: buffer,
          fileName: file.name,
        });

        uploadedImages.push(uploadResponse.url);
      }
    }

    // Validate LastDate
    const parsedLastDate = new Date(LastDate);
    if (isNaN(parsedLastDate.getTime())) {
      return res.status(400).json({ error: 'Invalid LastDate format' });
    }

    // Save blog (banner)
    const banner = await Banner.create({
      images: uploadedImages,
      Blog,
      author,
      title,
      URL,
      excerpt,
      Description,
      LastDate: parsedLastDate,
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error('BlogSave error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};




const BlogDisplayAll = async (req, res) => {
    try {
        const enquiries = await Banner.find();
        res.status(200).json({
            success: true,
            data: enquiries
        });
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch enquiries",
            error: error.message
        });
    }
};



const BlogDelete = async(req, res)=>{

     const {id} = req.params;
   await Banner.findByIdAndDelete(id);

    res.status(200).send("Task deleted")
}


const getProductById = async (req, res) => {
  try {
    const product = await Banner.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  BlogSave,
  BlogDisplayAll,
  BlogDelete,
  getProductById
};