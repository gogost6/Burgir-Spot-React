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

async function getCarsByCriteria(data) {
  let obj = {};
  let criteria = Object.entries(data)
    .filter((x) => x[1] !== "")
    .forEach((x) => {
      if (x[0] == "minPrice" || x[0] == "maxPrice") {
        obj.price = {};
      }
      if (x[0] == "dateMade") {
        obj[x[0]] = { $gte: new Date(x[1].slice(6)) };
      } else if (x[0] == "minPrice") {
        Object.assign(obj.price, { $gte: Number(x[1]) });
      } else if (x[0] == "maxPrice") {
        Object.assign(obj.price, { $lt: Number(x[1]) });
      } else {
        obj[x[0]] = x[1];
      }
    });
  const burgirs = Burgir.find(obj).lean();
  return burgirs;
}

async function create(burgir, email) {
  let user = await User.findOne({ email });
  Object.assign(burgir, { owner: user });
  const record = new Burgir(burgir);
  await record.save();
  user.createdBurgirs.push(record);
  await user.save();
}

async function getById(id) {
  const burgir = Burgir.findOne({ _id: id }).populate("owner").lean();
  return burgir;
}

async function edit(id, data) {
  let burgir = await Burgir.findOne({ _id: id });
  const images = data.imgUrl;
  delete data.imgUrl;
  console.log(burgir)
  if(images) {
      for (const img of images) {
          burgir.imgUrl.push(img);
      }
      await burgir.save();
  }
  let record = await Burgir.findByIdAndUpdate({ _id: id }, data);
  return record.save();
}

async function deleteAuto(id, userId) {
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
  deleteAuto,
  getCarsByCriteria,
  getRecent,
};
