const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isAuth, isOwner } = require("../middlewares/guards");
const { preloadBurgir } = require("../middlewares/preload");
const config = require("../config");
const jwt = require("jsonwebtoken");

router.post(
  "/create-burgir",
  isAuth(),
  body("name").notEmpty().withMessage("The name should not be empty!"),
  body("price").notEmpty().withMessage("The price should not be empty!"),
  body("meat").notEmpty().withMessage("The meat should not be empty!"),
  body("imgUrl").notEmpty().withMessage("The image Url should not be empty!"),
  async (req, res) => {
    try {
      const errors = Object.values(validationResult(req).mapped());

      if (errors.length > 0) {
        throw errors.map((e) => e.msg);
      }
      const burgirData = await req.storage.create(req.body, req.user.email);
      console.log("Successfully added burgir to the db!");
      res.json(burgirData);
    } catch (err) {
      console.log(err);
      res.status(406).json(err);
    }
  }
);

router.post("/search-burgirs", async (req, res) => {
  try {
    const searchResults = await req.storage.getBurgirsByCriteria(req.body);
    res.json(searchResults);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error" });
  }
});

router.get("/recent-burgirs", async (req, res) => {
  try {
    const searchResults = await req.storage.getRecent();
    res.json(searchResults);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error" });
  }
});

router.get("/details/:id", async (req, res) => {
  try {
    const searchResult = await req.storage.getById(req.params.id);
    res.json(searchResult);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error" });
  }
});

router.get("/delete/:id", preloadBurgir(), isOwner(), async (req, res) => {
  try {
    await req.storage.deleteBurgir(req.params.id, req.user._id);
    res.json({});
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error" });
  }
});

router.post("/created", async (req, res) => {
  if (req.body.length > 0) {
    try {
      let createdArr = [];
      for (let i = 0; i < req.body.length; i++) {
        const burgir = await req.storage.getById(req.body[i]);
        if (burgir) {
          createdArr.push(burgir);
        }
      }
      res.json(createdArr);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Error" });
    }
  } else {
    res.json([]);
  }
});

router.post(
  "/edit/:id",
  preloadBurgir(),
  isOwner(),
  body("name").notEmpty().withMessage("The name should not be empty!"),
  body("price").custom((value) => {
    if (+value < 1) {
      throw 'Price is below 1!'
    } else {
      return true
    }
  }),
  body("price").notEmpty().withMessage("The price should not be empty!"),
  body("meat").notEmpty().withMessage("The meat should not be empty!"),
  body("imgUrl").notEmpty().withMessage("The image Url should not be empty!"),
  async (req, res) => {
    try {
      const errors = Object.values(validationResult(req).mapped());
      if (errors.length > 0) {
        throw new Error(errors.map((e) => e.msg).join("\n"));
      }
      const burgirData = await req.storage.edit(req.params.id, req.body);
      console.log("Successfully edited burgir!");
      res.json(burgirData);
    } catch (err) {
      console.log(err);
      res.status(403).json({});
    }
  }
);

router.post(
  "/like",
  isAuth(),
  async (req, res) => {
    try {
      const errors = Object.values(validationResult(req).mapped());

      if (errors.length > 0) {
        throw errors.map((e) => e.msg);
      }
      await req.storage.addLikeBurgirModel(req.body._id, req.user.email);
      const userData = await req.storage.addToLiked(req.body._id, req.user.email);

      res.clearCookie(config.COOKIE_NAME);
      const token = jwt.sign(userData, config.TOKEN_SECRET);
      res.cookie(config.COOKIE_NAME, token, { httpOnly: true, sameSite: "Lax" });
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(406).json(err);
    }
  }
);

router.delete(
  "/like",
  isAuth(),
  async (req, res) => {
    try {
      const errors = Object.values(validationResult(req).mapped());

      if (errors.length > 0) {
        throw errors.map((e) => e.msg);
      }
      await req.storage.removeLikeBurgirModel(req.body._id, req.user.email);
      const userData = await req.storage.removeFromLiked(req.body._id, req.user.email);

      res.clearCookie(config.COOKIE_NAME);
      const token = jwt.sign(userData, config.TOKEN_SECRET);
      res.cookie(config.COOKIE_NAME, token, { httpOnly: true, sameSite: "Lax" });
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(406).json(err);
    }
  }
);

router.get(
  "/owned",
  isAuth(),
  async (req, res) => {
    try {
      const errors = Object.values(validationResult(req).mapped());

      if (errors.length > 0) {
        throw errors.map((e) => e.msg);
      }

      const owned = await req.storage.getOwned(req.user.email);
      res.json(owned);
    } catch (err) {
      console.log(err);
      res.status(406).json(err);
    }
  }
);

module.exports = router;
