const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const saltRounds = 10;

// Register
// router.get("/register", async (req, res) => {
//   try {
//     const user = await new User({
//       userName: "john",
//       email: "john@gmail.com",
//       password: "123456",
//     });
//     await user.save();
//     res.send("ok");
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/register", async (req, res) => {
  try {
    //   generate new Password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create new User
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    // Save user and response
    const user = await newUser.save();
    res.send("ok");
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// LogIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("password not valid");

    res.send(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
