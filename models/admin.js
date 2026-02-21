const adminSchema = new mongoose.Schema(
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
      default: "admin",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Admin", adminSchema);
