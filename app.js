const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const doctorRouter = require("./routes/doctor.js");
const nurseRouter = require("./routes/nurse.js");
const adminRouter = require("./routes/admin.js");
const patientRouter = require("./routes/patient.js");
const receptionistRouter = require("./routes/receptionist.js");

//CONNECTION WITH DB
main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/hospital");
}

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  }),
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/doctor", doctorRouter);
app.use("/nurse", nurseRouter);
app.use("/receptionist", receptionistRouter);
app.use("/admin", adminRouter);
app.use("/patient", patientRouter);

app.get("/", (req, res) => {
  res.render("ejs/index.ejs");
});

app.post("/login", (req, res) => {
  const { role } = req.body;
  res.render("ejs/login.ejs", { role });
});

app.post("/signup", (req, res) => {
  const { role } = req.body;
  res.render("ejs/signup.ejs", { role });
});

app.listen(3000, () => {
  console.log("server is listnig to port 3000");
});
