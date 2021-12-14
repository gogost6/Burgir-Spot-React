const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isAuth, isOwner } = require("../middlewares/guards");
const { preloadBurgir } = require("../middlewares/preload");

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
      res.json(JSON.stringify(burgirData));
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
module.exports = router;
