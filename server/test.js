// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

// const app = express();
// const port = 3000;

// // Set up storage for multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     // Generate a unique filename using UUID
//     const uniqueFilename = uuidv4();
//     const fileExtension = path.extname(file.originalname);
//     cb(null, `${uniqueFilename}${fileExtension}`);
//   },
// });

// // Set up file type filter for multer
// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];

//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."));
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // Limit file size to 5 MB
//   },
// });

// // Serve static files from the 'uploads' folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Route to handle image upload (accepts multiple files with the field name 'images' and an 'id' parameter)
// app.post("/upload/:id", upload.array("images", 5), (req, res) => {
//   const uploadedFiles = req.files;
//   const id = req.params.id;

//   if (!uploadedFiles || uploadedFiles.length === 0) {
//     return res.status(400).send("No files uploaded.");
//   }

//   // You can access the uploaded file information using req.files
//   const filePaths = uploadedFiles.map((file) => file.path);

//   // Include the id in the response
//   res.send(
//     `Files uploaded successfully for id ${id}. Paths: ${filePaths.join(", ")}`
//   );
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
