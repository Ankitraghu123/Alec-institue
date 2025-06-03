const Banner = require("../Module/WhyChooseModule");
const imagekit = require("../Utils/imageKit");

// Create a new success story
const SuccesserStudent = async (req, res) => {
  try {
    const {
      Title,
      description,
      keywordone,
      keywordtwo,
      keywordthree,
      keywordfour,
      keywordfive,
      keywordsix,
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
      Title,
      description,
      keywordone,
      keywordtwo,
      keywordthree,
      keywordfour,
      keywordfive,
      keywordsix,
      images: uploadedImages,
      size: parsedSize,
    });

    res.status(201).json(banner);
  } catch (error) {
    console.error("Error in SuccesserStudent:", error);
    res.status(500).json({ error: error.message });
  }
};

// Display all success stories
const SuccesserDisplay = async (req, res) => {
  try {
    const products = await Banner.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching success stories:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a specific success story
const StoryDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Banner.findByIdAndDelete(id);
    res.status(200).send("Success story deleted");
  } catch (error) {
    console.error("Error deleting story:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  SuccesserStudent,
  SuccesserDisplay,
  StoryDelete,
};
