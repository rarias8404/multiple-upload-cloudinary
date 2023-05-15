const express = require("express");
const dotenv = require("dotenv");
const { upload } = require("./multer");
const { uploadToCloudinary } = require("./cloudinary");

dotenv.config();

const app = express();

app.use(express.json());

app.post("/upload", upload.array("images", 5), async (req, res) => {
  try {
    const files = req.files;

    // Upload each file to Cloudinary
    const results = await Promise.all(
      files.map((file) => uploadToCloudinary(file))
    );

    res.json({ images: results });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
