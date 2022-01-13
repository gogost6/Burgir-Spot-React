const Burgir = require("../models/Burgir");
const User = require("../models/User");
const mongoose = require("mongoose");

async function getAll() {
  const burgirs = Burgir.find({}).lean();
  return burgirs;
}

async function getRecent() {
  const burgirs = Burgir.find({}).sort({ date: -1 }).lean();
  return burgirs;
}

async function getOwned(email) {
  const user = await User.find({email}).lean();
  const burgirs = await Burgir.find({_id: user[0].createdBurgirs});
  return burgirs;
}

async function addLikeBurgirModel(id, email) {
  let user = await User.findOne({ email });

  const record = await Burgir.findOneAndUpdate(
    { _id: id },
    { $push: { likes: user } },
    { safe: true, multi: true, new: true }
  );
  await record.save();
}

async function removeLikeBurgirModel(id, email) {
  let user = await User.findOne({ email });

  const record = await Burgir.findOneAndUpdate(
    { _id: id },
    { $pull: { likes: new mongoose.mongo.ObjectId(user._id) } },
    { safe: true, multi: true, new: true }
  );
  await record.save();
}

async function addToLiked(id, email) {
  let burgir = await Burgir.find({ _id: id });

  const record = await User.findOneAndUpdate(
    { email: email },
    { $push: { likedBurgirs: burgir } },
    { safe: true, multi: true, new: true }
  );
  await record.save();
  return JSON.stringify(record);
}

async function removeFromLiked(id, email) {
  const record = await User.findOneAndUpdate(
    { email: email },
    { $pull: { likedBurgirs: new mongoose.mongo.ObjectId(id) } },
    { safe: true, multi: true, new: true }
  );

  await record.save();
  return JSON.stringify(record);
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
  getRecent,
  addToLiked,
  removeFromLiked,
  addLikeBurgirModel,
  removeLikeBurgirModel,
  getOwned
};
