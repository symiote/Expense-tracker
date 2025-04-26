const jwt = require("jsonwebtoken");
const User = require("../models/User");

//middleware for  getuser route
exports.protect =async(req,res,next)=>{

    // extract the token form  authorization header and it will give = Beared "our token" <- so use split[1] to acess the token 
    let token = req.headers.authorization?.split(" ")[1];


    if (!token ) {
        return res.status(401).json({ message: "Not authorized,no token " });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        
        //fetch all data for the user exclude password
        req.user = await User.findById(decoded.id).select("-password");
        next();
    }  catch (err) {
        res.status(401).json({ message: "Not Autherized, token failed or expire" });
      }      
}

