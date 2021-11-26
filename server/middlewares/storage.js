const burgir = require('../services/burgir');

function init() {
    return (req, res, next) => {
        const storage = Object.assign({}, burgir);
        req.storage = storage;
        next();
    };
}

module.exports = init;