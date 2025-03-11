const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dlbvizb6s",
  api_key: "133659555461835",
  api_secret: "vYFghOHU0DgsS3CBN4W_KQCIqs0",
});

// Upload Image to Cloudinary
const uploadFileToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "rentease-images",
    });
    return result;
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

module.exports = { uploadFileToCloudinary };
