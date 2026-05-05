const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const passport = require("passport");

//Register new user
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
    failureRedirect: "/user/failure",
  }),
  async (req, res) => {
    const patients = await User.find({ role: "patient" });
    const doctors = await User.find({ role: "doctor" });
    const receptionists = await User.find({ role: "receptionist" });
    const logginedUser = await User.findById(req.user._id)
      .populate("assignedDoctor")
      .populate("assignedPatient");
    const Assignedpatients = logginedUser.assignedPatient;
    console.log(logginedUser);
    res.render(`./ejs/${logginedUser.role}.ejs`, {
      logginedUser,
      receptionists,
      patients,
      doctors,
      Assignedpatients,
    });
  },
);

router.get("/failure", (req, res) => {
  res.send("Email or password is wrong");
});

//logout
router.get("/logout", async (req, res) => {
  req.logout((err) => {
    if (err) {
      res.send("Some Error Occured: ", err);
    }
    res.redirect("/");
  });
});

//Add new patient route
router.post("/patient", async (req, res) => {
  try {
    const { username, password, email, assignedDoctor, age, gender, problem } =
      req.body;
    const patient = new User({
      username: username,
      problem: problem,
      age: age,
      gender: gender,
      email: email,
      assignedDoctor: assignedDoctor,
    });
    const registeredPatient = await User.register(patient, password);

    await User.findByIdAndUpdate(assignedDoctor, {
      $push: { assignedPatient: registeredPatient._id },
    });
    res.redirect("/");
  } catch (err) {
    console.log("Registration error:", err);
    res.redirect("/"); // Redirect back to signup on error
  }
});

// Add prescription
router.post("/add-prescription/:id", async (req, res) => {
  const { id } = req.params;
  const { prescription } = req.body;

  await User.findByIdAndUpdate(id, {
    prescription: prescription,
  });

  res.redirect("/");
});

module.exports = router;
