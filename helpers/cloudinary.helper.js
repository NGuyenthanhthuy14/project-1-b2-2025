const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: 'dpmevn504', 
    api_key: '213767677795549', 
    api_secret: 'MJAk-Ssl7m5CoAtMC7ukbaNmDQI' // Click 'View API Keys' above to copy your API secret
});

module.exports.storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});