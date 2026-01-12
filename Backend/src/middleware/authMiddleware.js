const jwt = require("jsonwebtoken");
const userModel = require("../models/userAuth.model");

const AuthMiddleware = async (req, res, next) => {
  try {
    console.log(req.cookies)
    const token = req.cookies.token;
       

    if (!token) {
     return res.status(401).json({
        message: "unauthorized user!!",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      _id: decode.userId,
    });
     if(!user){
     return res.status(404).json({
        message:"User not_found!!!"
      })
     }

    req.user = user;
    
    next();
  } catch (err) {
    console.error("Unothorise !! ,Login Again!!");
    return res.status(401).json({
      message: "Inavalid Token,pleass Login Again!!!",
      err,
    });
  }
};

module.exports = { AuthMiddleware };
