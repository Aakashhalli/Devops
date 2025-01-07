import UserTracking from "../model/userTracking.js";

const updateSimulationCompletionStatus = async (req, res) => {
  const { algorithmName } = req.body;
  const userId = req.user._id;
  if (!algorithmName) {
    return res.status(400).json({ error: "AlgorithmName is required" });
  }
  // console.log(algorithmName);
  // console.log(userId);

  try {
    const trackingData = await UserTracking.findOneAndUpdate(
      { userId },
      { [`algorithms.${algorithmName}.isSimulationCompleted`]: true },
      { new: true }
    );

    if (!trackingData) {
      return res.status(404).json({ error: "Tracking data not found" });
    }

    res.status(200).json({
      message: "Simulation marked as complete successfully",
      trackingData,
    });
  } catch (error) {
    console.error("Error updating simulation completion status:", error);
    res
      .status(500)
      .json({ error: "Failed to update simulation completion status" });
  }
};

const updateTheoryCompletionStatus = async (req, res) => {
  const { algorithmName } = req.body;
  const userId = req.user._id;
  console.log("ALGO NAME", algorithmName);

  if (!algorithmName) {
    return res.status(400).json({ error: "AlgorithmName is required" });
  }

  try {
    const trackingData = await UserTracking.findOneAndUpdate(
      { userId },
      { [`algorithms.${algorithmName}.isTheoryCompleted`]: true },
      { new: true }
    );

    if (!trackingData) {
      return res.status(404).json({ error: "Tracking data not found" });
    }

    res.status(200).json({
      message: "Theory marked as complete successfully",
      trackingData,
    });
  } catch (error) {
    console.error("Error updating theory completion status:", error);
    res
      .status(500)
      .json({ error: "Failed to update theory completion status" });
  }
};

const saveQuizScore = async (req, res) => {
  const { userId, algorithmName, quizMarks } = req.body;
  // console.log(req.body);

  if (!userId || !algorithmName || quizMarks === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const validAlgorithms = [
    "Dijkstra's Algorithm",
    "Floyd-Warshall Algorithm",
    "Bellman-Ford Algorithm",
  ];
  if (!validAlgorithms.includes(algorithmName)) {
    return res.status(400).json({ error: "Invalid algorithm name" });
  }

  try {
    const trackingData = await UserTracking.findOne({ userId });
    // console.log(trackingData);

    if (!trackingData) {
      return res.status(404).json({ error: "User tracking data not found" });
    }

    // Update the quiz marks for the specified algorithm
    // console.log(trackingData.algorithms[algorithmName].quizMarks);

    trackingData.algorithms[algorithmName].quizMarks = quizMarks;

    await trackingData.save();

    res.json({ message: "Quiz score updated successfully!" });
  } catch (error) {
    console.error("Error updating quiz score:", error);
    res.status(500).json({ error: "Failed to update quiz score" });
  }
};

const getUserTrackingData = async (req, res) => {
  const { userId } = req.params;

  try {
    const trackingData = await UserTracking.findOne({ userId });
    if (!trackingData) {
      return res.status(404).json({ error: "User tracking data not found" });
    }

    res.status(200).json(trackingData);
  } catch (error) {
    console.error("Error fetching user tracking data:", error);
    res.status(500).json({ error: "Failed to fetch user tracking data" });
  }
};

export {
  updateSimulationCompletionStatus,
  updateTheoryCompletionStatus,
  saveQuizScore,
  getUserTrackingData,
};
