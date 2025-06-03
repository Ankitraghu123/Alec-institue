const EnquiryModel = require('../Module/CallbackPopUp');

// Save name and phone to database (no email sending)
const CallbackPopUp = async (req, res) => {
    const { name, phone } = req.body;

    try {
        const enquiry = await EnquiryModel.create({ name, phone });

        res.status(201).json({
            success: true,
            message: "User enquiry successfully submitted",
            data: enquiry
        });
        
    } catch (error) {
        console.error("Enquiry error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred during enquiry submission",
            error: error.message
        });
    }
};

// Fetch all enquiries
const ContactDisplay = async (req, res) => {
    try {
        const myData = await EnquiryModel.find();
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

// Delete a single enquiry by ID
const RecordDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEnquiry = await EnquiryModel.findByIdAndDelete(id);

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





module.exports = {
    CallbackPopUp,
    ContactDisplay,
    RecordDelete
};
