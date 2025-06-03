
const EnquiryModel = require('../Module/EnrollModule');
const ProductModel = require('../Module/Coursemodule');
const nodemailer = require('nodemailer'); // ✅ Add this import

// POST - Create enquiry
const EnquiryProduct = async (req, res) => {
    const {id} = req.params;
    const { name, email, phone, city, message, productName } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false,
            message: "Name, email, and message are required fields"
        });
    }
    
    try {
        const enquiry = await EnquiryModel.create({
            name,
            email,
            phone,
            city,
            message,
            productId:id,
        });

        // Setup nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'adityajainghetal@gmail.com',
                pass: 'wjiv vwra gbpo mkgr' // ⚠️ Never hardcode passwords in real apps
            }
        });
        
        const mailOptions = {
            from: email,
            to: "adityajainghetal@gmail.com",
            city: 'Enquiry Received', 
            text: `Thank you for your enquiry.\n\nMessage: ${message}\nProduct Name: ${productName}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.error("Email sending error:", error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully!",
            data: enquiry
        });
    } catch (error) {
        console.error("Enquiry submission error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your enquiry",
            error: error.message
        });
    }
};

// GET - Get product by ID
const EnquiryGetProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error: error.message
        });
    }
};

// GET - All enquiries
const EnquiryDisplayAll = async (req, res) => {
    try {
        const enquiries = await EnquiryModel.find().populate('productId');
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

// GET - Single enquiry by ID
const EnquiryDisplayById = async (req, res) => {
    const { id } = req.params;
    try {
        const enquiry = await EnquiryModel.findById(id).populate('productId');
        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found"
            });
        }
        res.status(200).json({
            success: true,
            data: enquiry
        });
    } catch (error) {
        console.error("Error fetching enquiry:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch enquiry",
            error: error.message
        });
    }
};

// DELETE - Delete enquiry by ID
const EnquiryDelete = async (req, res) => {
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
    EnquiryProduct,
    EnquiryDisplayAll,
    EnquiryDisplayById,
    EnquiryGetProduct,
    EnquiryDelete
};
