import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  algorithmName: String,
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number,
    },
  ],
});

const QUESTION = mongoose.model("Question", questionSchema);

export default QUESTION;
