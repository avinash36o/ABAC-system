const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });

//show user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username != "admin" || password != "admin") {
    res.send("username or password is not valid :(");
  } else {
    res.render("ejs/admin.ejs");
  }
});

module.exports = router;
