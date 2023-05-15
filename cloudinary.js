const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path, // The file path on disk
      {
        folder: "uploads", // Optional folder in Cloudinary to store the uploaded files
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          fs.unlinkSync(file.path);
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  uploadToCloudinary,
};
