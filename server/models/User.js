const { Schema, model } = require('mongoose');

const schema = {
    email: { type: String, required: true },
    username: { type: String, required: true },
    telephone: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    createdAutos: [{ type: Schema.Types.ObjectId, ref: 'Auto' }],
    favourite: [{ type: Schema.Types.ObjectId, ref: 'Auto' }]
};

module.exports = model('User', schema);