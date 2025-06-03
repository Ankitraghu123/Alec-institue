const EnquiryModel = require('../Module/SylllabusModuleRegister');
const nodemailer = require('nodemailer'); // You missed this import

const ContactProduct = async (req, res) => {
    const { name, email, phone, city } = req.body; // Added productName here

    try {
        const enquiry = await EnquiryModel.create({
            name,
            email,
            phone,
        //    city,
            city,
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'adityajainghetal@gmail.com',  // Secure way: use environment variables
                pass: 'wjiv vwra gbpo mkgr' 
            }
        });

        const mailOptions = {
            from: email,
            to: 'adityajainghetal@gmail.com', 
           city: 'Enquiry Received', 
            text: `Thank you for your enquiry.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\ncity: ${city}`
        };

        await transporter.sendMail(mailOptions); // use await instead of callback function for better control

        res.status(201).json({
            success: true,
            city: "User enquiry successfully sent",
            data: enquiry
        });
        
    } catch (error) {
        console.error("Enquiry error:", error);
        res.status(500).json({
            success: false,
            city: "An error occurred during enquiry submission",
            error: error.city
        });
    }
};

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
            city: "Failed to fetch enquiries",
            error: error.city
        });
    }
};

const RecordDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEnquiry = await EnquiryModel.findByIdAndDelete(id);

        if (!deletedEnquiry) {
            return res.status(404).json({
                success: false,
                city: "Enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            city: "Enquiry deleted successfully",
            data: deletedEnquiry
        });
    } catch (error) {
        console.error("Error deleting enquiry:", error);
        res.status(500).json({
            success: false,
            city: "Failed to delete enquiry",
            error: error.city
        });
    }
};

module.exports = {
    ContactProduct,
    ContactDisplay,
    RecordDelete
};
