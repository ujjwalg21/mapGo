const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const authenticate = async(req,res,next)=>{
    try{
        const token = req.cookies.mapgo;
        const verify = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne(
            {_id: verify._id, "tokens:token": token}
        )
        
        if(!rootUser){
            throw new Error('User not found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    }
    catch(err){
        console.log(err);
    }
}

module.exports = authenticate;