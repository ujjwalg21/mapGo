const mongoose = require('mongoose');

//defining the shape of the document
const hostSchema = new mongoose.Schema(
{
    hostname: {
        type: String,
        required: true
    },    
    iitkemail: {
            type:String,
            required: true
        },
    phone: {
        type: Number,
        required: true
    },
    hostpassword: {
        type: String,
        required: true
    },
    about:{
        type: String
    },
    labels: [
        {
            type:String
        }
    ]
   
}, {
    timestamps:true
}
);


const Host = mongoose.model('Host', hostSchema);
module.exports = Host;
