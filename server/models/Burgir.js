const { model, Schema } = require("mongoose");

const schema = {
    name: { type: String, required: true },
    ingridients: { type: Array, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: new Date() },
    imgUrl: { type: Array },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
};

module.exports = model("Burgir", schema);

// features: {
//     interior: [{ type: String }],
//     security: [{ type: String }],
//     safety: [{ type: String }],
//     exterior: [{ type: String }],
//     other: [{ type: String }]
// },
