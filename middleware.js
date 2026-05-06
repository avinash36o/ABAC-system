const User = require("./models/user.js");

module.exports.isReceptionist = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).send("Login required");
  }
  if (req.user.role !== "receptionist") {
    return res.status(403).send("Access denied");
  }
  next();
};

module.exports.isDoctor = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).send("Login required");
  }
  if (req.user.role !== "doctor") {
    return res.status(403).send("Access denied");
  }
  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).send("Login required");
  }
  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied");
  }
  next();
};
