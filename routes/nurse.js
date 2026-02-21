const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });
const Nurse = require("../models/nurse.js");
const LocalStrategy = require("passport-local");
const passport = require("passport");

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Nurse.authenticate()));
passport.serializeUser(Nurse.serializeUser());
passport.deserializeUser(Nurse.deserializeUser());

//show user
router.post("/login", async (req, res) => {
  res.send("nurse logined!");
});

//signup
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const newNurse = new Nurse({ username, email });
  const newNurseAdded = await Nurse.register(newNurse, password);
  console.log(newNurseAdded);
  res.send(`A Nurse named ${newNurseAdded.username} added!`);
});

module.exports = router;
