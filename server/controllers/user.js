const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const config = require("../config");
const { isAuth, isGuest } = require("../middlewares/guards");
const userService = require("../services/user");

router.get('/', async (req, res) => {

  if (req.cookies[config.COOKIE_NAME]) {
      try {
          const user = jwt.verify(req.cookies[config.COOKIE_NAME], config.TOKEN_SECRET);
          return res.json(user)
      } catch (err) {
          return res.clearCookie(req.cookies[config.COOKIE_NAME]);
      }
  }
  return res.json(undefined);
});

router.post(
  "/register",
  isGuest(),
  body("email").trim().isEmail().withMessage("The email should be valid!"),
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("The username should contain only chars!")
    .isLength({ min: 5 })
    .withMessage("The username should be atleast 5 chars!"),
  body("telephone")
    .trim()
    .isNumeric()
    .withMessage("The telephone input should contain only numbers!"),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("The password input should be atleast 4 characters long!"),
  body("repassword")
    .trim()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw "Passwords don't match";
      }
      return true;
    }),
  async (req, res) => {
    try {
      const { email, username, telephone, password } = req.body;
      const errors = Object.values(validationResult(req).mapped());

      if (errors.length > 0) {
        throw errors.map((e) => e.msg);
      }

      const existingByEmail = await userService.getUserByEmail(email);
      const existingByUsername = await userService.getUserByUsername(username);
      const existingByTelephone = await userService.getUserByTelephone(
        telephone
      );

      if (existingByEmail) {
        throw "Email is registered already";
      }

      if (existingByUsername) {
        throw "Username is taken!";
      }

      if (existingByTelephone) {
        throw "Telephone is being used by other user!";
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userService.createUser(
        email,
        username,
        telephone,
        hashedPassword
      );

      const userViewModel = {
        _id: user._id,
        email: user.email,
        username: user.username,
        telephone: user.telephone,
      };
      const token = jwt.sign(userViewModel, config.TOKEN_SECRET);

      res.cookie(config.COOKIE_NAME, token, { httpOnly: true });
      res.json(userViewModel);
    } catch (err) {
      console.log(err);
      res.status(401).json(err);
    }
  }
);

router.post(
  "/login",
  isGuest(),
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("The username should contain only chars!"),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("The password input should be atleast 4 characters long!"),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const errors = Object.values(validationResult(req).mapped());
      if (errors.length > 0) {
        throw errors.map((e) => e.msg).join("\n");
      }
      const user = await userService.getUserByUsername(username);

      if (!user) {
        throw "Wrong username or password!";
      } else {
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
          throw "Wrong username or password!";
        } else {
          const userViewModel = {
            _id: user._id,
            email: user.email,
            username: user.username,
            createdBurgirs: user.createdBurgirs,
            favouriteBurgirs: user.favouriteBurgirs,    
            likedBurgirs: user.likedBurgirs,    
            telephone: user.telephone,
          };
          const token = jwt.sign(userViewModel, config.TOKEN_SECRET);

          res.cookie(config.COOKIE_NAME, token, { httpOnly: true, sameSite: "Lax" });
          res.json(userViewModel);
        }
      }
    } catch (err) {
      console.log(err);
      res.status(401).json('Wrong username or password!');
    }
  }
);

router.post(
  "/edit",
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("The username should contain only chars!")
    .isLength({ min: 5 })
    .withMessage("The username should be atleast 5 chars!"),
  body("telephone")
    .trim()
    .isNumeric()
    .withMessage("The telephone input should contain only numbers!"),
  body("oldPassword")
    .trim()
    .custom(async (value, { req }) => {
      if (value == "") {
        return true;
      }
      const user = await userService.getUserByUsername(req.user.username);
      const isOldPassword = await bcrypt.compare(value, user.hashedPassword);

      if (!isOldPassword) {
        throw "Old password doesn't match!";
      }
      return true;
    }),
  async (req, res) => {
    try {
      const {
        id,
        username,
        telephone,
        oldPassword,
        newPassword,
        curUsername,
        curTelephone,
      } = req.body;
      validationResult(req).throw();

      const existingByUsername = await userService.getUserByUsername(username);
      const existingByTelephone = await userService.getUserByTelephone(
        telephone
      );

      if (existingByUsername && curUsername != username) {
        throw "Username is taken!";
      }

      if (existingByTelephone && curTelephone != telephone) {
        throw "Telephone is being used by other user!";
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const userUpdateModel = { username, telephone, hashedPassword };
      const user = await userService.updateUser(id, userUpdateModel);

      const userViewModel = {
        _id: user._id,
        email: user.email,
        username: user.username,
        createdAutos: user.createdAutos,
        telephone: user.telephone,
      };
      res.clearCookie(config.COOKIE_NAME);
      const token = jwt.sign(userViewModel, config.TOKEN_SECRET);
      res.cookie(config.COOKIE_NAME, token, { httpOnly: true, sameSite: "Lax" });
      res.json(userViewModel);
    } catch (err) {
      console.log(err.errors.map((e) => e.msg));
      res.status(401).json({ msg: err.errors.map((e) => e.msg) });
    }
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie(config.COOKIE_NAME).status(200).end();
});

router.get("/free-username/:username", async (req, res) => {
  res.json(!!(await userService.getUserByUsername(req.params.username)));
});

router.get("/free-email/:email", async (req, res) => {
  res.json(!!(await userService.getUserByEmail(req.params.email)));
});
module.exports = router;
