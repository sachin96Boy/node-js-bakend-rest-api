const router = require("express").Router();

// create a post
// update a post
// Delete a post
// like a post
// get a post
// get all posts

router.get("/", (req, res) => {
  console.log("posts page");
});

module.exports = router;
