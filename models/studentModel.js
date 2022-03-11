const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    name: {
      type: "String",
      required: true,
    },
    mentor: {
      type: Schema.Types.ObjectId,
      ref: "Mentor",
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
