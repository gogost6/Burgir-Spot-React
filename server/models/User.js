const { Schema, model } = require('mongoose');

const schema = {
    email: { type: String, required: true },
    username: { type: String, required: true },
    telephone: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    createdBurgirs: [{ type: Schema.Types.ObjectId, ref: 'Burgir' }],
    likedBurgirs:  [{ type: Schema.Types.ObjectId, ref: 'Burgir' }],
};

module.exports = model('User', schema);