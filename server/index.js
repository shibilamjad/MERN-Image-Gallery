const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const imagesJson = require("./image.json");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

app.get("/api/images", (req, res) => {
  res.status(200).json(imagesJson);
  console.log("done");
});

app.post("/api/images", upload.single("upload_file"), async (req, res) => {
  try {
    const data = { id: uuidv4(), fileName: req.file.filename };
    imagesJson.push(data);

    await fs.writeFile("./image.json", JSON.stringify(imagesJson));

    res.status(200).json({ message: "Image uploaded", data });
  } catch {
    res.status(400).json({
      message: "Error during upload:",
    });
  }
});

const PORT = 3005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
