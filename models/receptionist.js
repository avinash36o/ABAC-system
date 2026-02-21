const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const receptionistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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

    role: {
      type: String,
      require: true,
      default: "receptionist",
    },

    assignedPatient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  },
  { timestamps: true },
);

receptionistSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Receptionist", receptionistSchema);
