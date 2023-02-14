//company name. posituon applied for, status of application,createdBy

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "please  provide a company name"],
    },
    position: {
      type: String,
      required: [true, "please  provide a position"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "please provide a user "],
    },
    status: {
      type: String,
      enum: ["interview", "applied", "declined"],
      default: "applied",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("job", jobSchema);
