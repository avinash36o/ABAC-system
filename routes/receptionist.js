const express = require("express");
const app = express();
const router = express.Router({ mergeParams: true });
const Receptionist = require("../models/receptionist.js");
const LocalStrategy = require("passport-local");
const passport = require("passport");

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Receptionist.authenticate()));
passport.serializeUser(Receptionist.serializeUser());
passport.deserializeUser(Receptionist.deserializeUser());

//show user
router.post("/login", async (req, res) => {
  res.send("Receptionist logined!");
});

//signup
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const newReceptionist = new Receptionist({ username, email });
  const newReceptionistAdded = await Receptionist.register(
    newReceptionist,
    password,
  );
  console.log(newReceptionistAdded);
  res.send(`A Receptionist named ${newReceptionistAdded.username} added!`);
});

module.exports = router;
