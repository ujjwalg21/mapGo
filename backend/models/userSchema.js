const mongoose = require('mongoose');

//defining the shape of the document
const userSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
        minlength: 1,
    },    
    iitkemail: {
            type:String,
            required: true
        },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    }
   
}, {timestamps:true}
);


const User = mongoose.model('User', userSchema);
module.exports = User;
