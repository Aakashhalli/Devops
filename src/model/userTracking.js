import mongoose from "mongoose";

// Define the User Tracking Schema
const userTrackingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
  algorithms: {
    "Dijkstra's Algorithm": {
      isSimulationCompleted: { type: Boolean, default: false },
      isTheoryCompleted: { type: Boolean, default: false },
      quizMarks: { type: Number, default: 0 },
    },
    "Floyd-Warshall Algorithm": {
      isSimulationCompleted: { type: Boolean, default: false },
      isTheoryCompleted: { type: Boolean, default: false },
      quizMarks: { type: Number, default: 0 },
    },
    "Bellman-Ford Algorithm": {
      isSimulationCompleted: { type: Boolean, default: false },
      isTheoryCompleted: { type: Boolean, default: false },
      quizMarks: { type: Number, default: 0 },
    },
  },
});

const UserTracking = mongoose.model("UserTracking", userTrackingSchema);

export default UserTracking;
