const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddlware");
  
const {
  registerUser,
  loginUser,
  getUserInfo,
  resetPassword,
  forgotPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser",protect,getUserInfo) //here protect is middleware not defined yrt 58:27

//new
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


router.post("/upload-image", upload.single("image"),(req,res)=>{
  
  if(!req.file){
    return res.status(400).json({message:"No file uploaded"})
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;  

  res.status(200).json({imageUrl});
  
})

module.exports = router;
