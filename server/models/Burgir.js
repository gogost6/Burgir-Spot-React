const { model, Schema } = require("mongoose");

const schema = {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    meat: { type: Array, required: true },
    vegetables: { type: Array, required: true },
    spices: { type: Array, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: new Date() },
    imgUrl: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'User' }],
};

module.exports = model("Burgir", schema);
