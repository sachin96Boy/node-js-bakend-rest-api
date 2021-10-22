const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

const saltRounds = 10;

router.get("/", (req, res) => {
  res.send("this is userRoute");
});

// update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(saltRounds);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account Updated Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
});
// delete user
// get a user
// follow user
// unfollow user

module.exports = router;
