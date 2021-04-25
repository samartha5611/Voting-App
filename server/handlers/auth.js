const jwt = require("jsonwebtoken");
const db = require("../models");

exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { id, username } = user;

    const token = jwt.sign({ id, username }, process.env.SECRET);
    res.status(200).json({ id, username, token });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username is already taken";
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      username: req.body.username,
    });
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    const token = jwt.sign({ id, username }, process.env.SECRET);

    if (valid) {
      res.json({
        id,
        username,
        token,
      });
    } else {
      throw new Error("Invalid Username/Password");
    }
  } catch (err) {
    err.message = "Invalid username/Password";
    next(err);
  }
};

// const db = require("../models");

// exports.register = async (req, res, next) => {
//   try {
//     const user = await db.User.create(req.body);
//     // const { id, username } = user;
//     res.json({ id, username });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.login = async (req, res, next) => {
//   try {
//     const user = await db.User.findOne({
//       username: req.body.username,
//     });
//     const { id, username } = user;
//     const valid = await user.comparePassword(req.body.password);

//     if (valid) {
//       res.json({
//         id,
//         username,
//       });
//     } else {
//       throw new Error("Invalid Username/Password");
//     }
//   } catch (err) {
//     next(err);
//   }
// };
