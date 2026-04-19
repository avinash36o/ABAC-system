// models/user.js
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "doctor", "nurse", "receptionist", "patient"],
      default: "patient",
    },

    // role-specific fields
    department: String, // doctor
    assignedPatient: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // nurse/receptionist
    assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // patient
    prescription: String, // patient
    billing: {
      type: String,
      enum: ["Pending", "Partial", "Complete"],
      default: "Pending",
    },
    vitals: {
      temp: Number,
      bp: String,
      heartRate: Number,
      oxygen: Number,
    },
  },
  { timestamps: true },
);

// passport-local-mongoose adds hash/salt and authentication helpers
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

module.exports = mongoose.model("User", userSchema);
