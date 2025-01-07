import QUESTION from "../model/question.js";

const getQuestions = async (req, res) => {
  const { algorithmName } = req.params;
  try {
    const data = await QUESTION.findOne({ algorithmName });
    if (data) {
      res.json(data.questions);
    } else {
      res.status(404).send("Questions not found");
    }
  } catch (error) {
    res.status(500).send("Server error", error);
  }
};

export default getQuestions;
