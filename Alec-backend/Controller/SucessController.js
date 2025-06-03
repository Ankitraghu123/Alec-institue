const Banner = require("../Module/SucessModule");
const imagekit = require("../Utils/imageKit");

const Sucesserstudent = async (req, res) => {
  try {
    const {
      StudentName,
      Judicial,
      size,

    } = req.body;

    const parsedSize = typeof size === 'string' ? JSON.parse(size) : size;

    // Handle image uploads
    const uploadedImages = [];
    const files = Array.isArray(req.files?.images)
      ? req.files.images
      : [req.files?.images].filter(Boolean); // Ensure single file still gets handled

    for (let file of files) {
      const buffer = file.data;
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
      });
      uploadedImages.push(uploadResponse.url);
    }


    const banner = await Banner.create({
      StudentName,
      Judicial,
      images: uploadedImages,
      size: parsedSize
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


const Successerdisplay = async (req, res) => {
    try {
        const products = await Banner .find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: error.message });
    }
};

const StoryDelete = async(req, res)=>{

     const {id} = req.params;
   await Banner.findByIdAndDelete(id);

    res.status(200).send("Task deleted")
}


module.exports = {
  Sucesserstudent,
  Successerdisplay,
  StoryDelete
};
