const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const process = require('express');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) {
      console.error('No local file path provided.');
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkError) {
      console.error('Error deleting local file:', unlinkError);
    }
    return null;
  }
}

module.exports = { uploadOnCloudinary };
