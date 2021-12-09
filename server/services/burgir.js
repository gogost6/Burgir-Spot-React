const Burgir = require("../models/Burgir");
const User = require("../models/User");
const mongoose = require("mongoose");

async function getAll() {
  const burgirs = Burgir.find({}).lean();
  return burgirs;
}

async function getRecent() {
  const burgirs = Burgir.find({}).sort({ date: -1 }).limit(3).lean();
  return burgirs;
}

async function create(burgir, email) {
  let user = await User.findOne({ email });
  const burgerData = Object.assign(burgir, { owner: user });
  const record = new Burgir(burgir);
  await record.save();
  user.createdBurgirs.push(record);
  await user.save();
  return burgerData;
}

async function getById(id) {
  const burgir = Burgir.findOne({ _id: id }).populate("owner").lean();
  return burgir;
}

async function edit(id, data) {
  let record = await Burgir.findByIdAndUpdate({ _id: id }, data);
  return record.save();
}

async function deleteBurgir(id, userId) {
  const record = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { createdBurgirs: new mongoose.mongo.ObjectId(id) } },
    { safe: true, multi: true, new: true }
  );
  await record.save();
  Burgir.findByIdAndRemove({ _id: id }, (err, docs) => {
    try {
      if (err) {
        throw new Error(err);
      } else {
        console.log("Successful deletion " + docs);
      }
    } catch (err) {
      console.log("Wrong data!");
    }
  });
}

module.exports = {
  create,
  getAll,
  getById,
  edit,
  deleteBurgir,
  getRecent
};
