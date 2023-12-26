const multer = require("multer");
const uploadRouter = require("express").Router()
// const cloudinary = require("cloudinary").v2;
// const fs=require("fs")
const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {cb(null, "public/images")},
    filename:(req,file,cb)=>{cb(null,req.body.imageUrl)}
  });
  const upload = multer({ storage });


          
// cloudinary.config({ 
//   cloud_name: 'dlweshii1', 
//   api_key: '348665113567648', 
//   api_secret: 'DEL8csNSMNfyd-KvH-Y9sTo0UF4' 
// });


uploadRouter.post("/", upload.single("photo"), async (req, res, next) => {
  try {
    // Your existing code...
    return res.status(201).json({ message: "Successfully uploaded" });
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to Express error handling middleware
  }
});



//   const imageController = (req, res, next) => {
//     upload.single("image")(req, res, async (err) => {
//       if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded." });
//       }
  
//       const { filename, size } = req.file;
  
//       res.json({ message: "File uploaded successfully", filename, size });
//     });
//   };



// const imagecontroller = (req, res, next) => {
//     console.log(req);
//     upload.single("image")(req, res, async (err) => {
//       if (err) { return res.status(400).json({ message: "Image upload failed" }) }
  
//       try {
//         const result = await cloudinary.uploader.upload(req.file.path, { folder: 'products'})
//         req.imageUrl = result.secure_url;

//         fs.unlink(req.file.path, (unlinkErr) => {
//           if (unlinkErr) {
//             console.error("Failed to delete local image file:", unlinkErr);
//           }
//         });


//         next();
//       } catch (err) {
//         return res
//           .status(500)
//           .json({ message: "Failed to upload image to Cloudinary" });
//       }
//     });
//   };
  
  module.exports = uploadRouter;