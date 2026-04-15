const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const passport = require("passport");

//new user
router.post("/", async (req, res, next) => {
  try {
    let { username, email, role, department, password } = req.body;
    const user = new User({
      username: username,
      email: email,
      role: role,
      department: department,
    });

    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      console.log("User logged in after registration");
      console.log(registeredUser);
      res.redirect("/user/success");
    });
  } catch (err) {
    console.log("Registration error:", err);
    res.redirect("/"); // Redirect back to signup on error
  }
});

router.get("/success", (req, res) => {
  console.log("user registered successfully : ");
  console.log(req.user);
  res.send("user registered successfully : ");
});

//login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
  }),
  async (req, res) => {
    const logginedUser = req.user;
    console.log(logginedUser);
    res.send(`loginned successful : ${logginedUser.username}`);
  },
);

module.exports = router;
