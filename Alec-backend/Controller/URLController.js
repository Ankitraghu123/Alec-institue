const Course = require("../Module/URLModuel"); // fixed typo in filename

const CourseSave = async (req, res) => {
  try {
    const { URL } = req.body;

    // Basic validation
    if (!URL) {
      return res.status(400).json({ error: "URL is required" });
    }

    const course = await Course.create({ URL });

    res.status(201).json(course);
  } catch (error) {
    console.error('CourseSave error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

const ContactDisplay = async (req, res) => {
    try {
        const myData = await Course.find();
        res.status(200).json({
            success: true,
            data: myData
        });
    } catch (error) {
        console.error("Fetching enquiries error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch enquiries",
            error: error.message
        });
    }
};


const URLDeleted = async (req, res) => {
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


module.exports = {
  CourseSave,
  ContactDisplay,
  URLDeleted
};
