const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true }); //creating router object
const Doctor = require("../models/doctor.js");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const session = require("express-session");

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Doctor.authenticate()));
passport.serializeUser(Doctor.serializeUser());
passport.deserializeUser(Doctor.deserializeUser());

//show user
router.post("/login", async (req, res) => {
  res.send("doctor logined!");
});

//signup
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const newDoctor = new Doctor({ username, email });
  const newDoctorAdded = await Doctor.register(newDoctor, password);
  console.log(newDoctorAdded);
  res.send(`A Doctor named ${newDoctorAdded.username} added!`);
});

module.exports = router;
