const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    age: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    gender: String,
    contactNumber: Number,
    address: String,

    role: {
      type: String,
      require: true,
      default: "patient",
    },

    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },

    prescription: {
      type: String,
      require: true,
    },

    billing: {
      type: String,
      enum: ["Pending", "Partial", "Complete"],
    },

    vitals: {
      temp: Number,
      bp: Number,
      hearRate: Number,
      oxygen: Number,
    },
  },
  { timestamps: true },
);

patientSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Patient", patientSchema);
