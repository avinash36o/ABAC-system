const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");

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

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/user", userRouter);

app.get("/", (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.render(`ejs/${req.user.role}.ejs`);
  } else {
    res.render("ejs/index.ejs");
  }
});

app.listen(3000, () => {
  console.log("server is listnig to port 3000");
});
