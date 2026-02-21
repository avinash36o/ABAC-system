const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });

//show user
router.post("/login", async (req, res) => {
  res.send("patient logined!");
});

router.post("/signup", async (req, res) => {
  res.send("patient signup!");
});

module.exports = router;
