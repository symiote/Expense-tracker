const multer = require("multer");

//  configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg" , "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); //null means: no error ,and true menas : Accept the file for upload 
  } else {
    cb(new Error("Only JPEG , JPG ,and PNG files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload; //in video- we use upload name
