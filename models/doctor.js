const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const docSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      required: true,
      default: "doctor",
    },

    department: {
      type: String,
      require: true,
    },

    assignedPatient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  },
  { timestamps: true },
);

docSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Doctor", docSchema);
