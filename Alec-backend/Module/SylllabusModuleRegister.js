const mongoose = require('mongoose');

const SyllabusRegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phone: {
    type: String,
  
    validate: {
      validator: function(v) {
        return /^[\d\s+-]{10,}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
 city: {
    type: String,
  }
  
});


const Contact = mongoose.model('Syllabusregister', SyllabusRegisterSchema);

module.exports = Contact;