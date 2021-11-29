const { model, Schema } = require("mongoose");

const schema = {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: { type: Array, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: new Date() },
    imgUrl: { type: Array },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'User' }],
};

module.exports = model("Burgir", schema);
