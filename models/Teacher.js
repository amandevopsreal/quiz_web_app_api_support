const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeacherSchema = new Schema({
  quiz_id: {
    type: String,
    required: true,
    unique: true,
  },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  quiz_name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  no_of_question: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  questions: {
    type: [],
    required: true,
  },
});
const Teacher = mongoose.model("teacher", TeacherSchema);
module.exports = Teacher;
