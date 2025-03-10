const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'Shaivan',
    api_key: '133659555461835',
    api_secret: 'vYFghOHU0DgsS3CBN4W_KQCIqs0'
});

const uploadImage = (filePath) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    uploadImage
};
