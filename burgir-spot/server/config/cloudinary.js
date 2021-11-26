const cloudinary = require('cloudinary');
const config = require('.');

module.exports = () => {
    cloudinary.config(config.cloudinary);
}