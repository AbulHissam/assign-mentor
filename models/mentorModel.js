const mongoose = require("mongoose");
const { Schema } = mongoose;

const mentorSchema = new Schema(
  {
    name: {
      type: "String",
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
