import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import toast from "react-hot-toast";

const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const randomizeQuestions = (questions) => {
  return shuffleArray(
    questions.map((q) => {
      // Shuffle the options, keeping track of their original indices
      const shuffledOptions = shuffleArray(
        q.options.map((option, index) => ({
          option,
          originalIndex: index,
        }))
      );

      // Find the new index of the correct answer
      const correctIndex = shuffledOptions.findIndex(
        (o) => o.originalIndex === q.correctAnswer
      );

      // Return the question with the updated options and correct answer index
      return {
        question: q.question,
        options: shuffledOptions.map((o) => o.option),
        correctAnswer: correctIndex,
      };
    })
  );
};

const Quiz = ({ algorithmName }) => {
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/profile");
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/questions/${algorithmName}`);
        const randomizedQuestions = randomizeQuestions(response.data);
        setQuestions(randomizedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [algorithmName]);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleOptionChange = (index) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        score += 10;
      } else if (selectedAnswers[index] !== undefined) {
        score -= 5;
      }
    });
    setTotalScore(score);
    setQuizCompleted(true);

    try {
      const response = await axios.post("/api/user-tracking/quiz-score", {
        userId: userDetails._id, // Replace with the logged-in user's ID
        algorithmName, // Pass the current algorithm's name
        quizMarks: score,
      });
      // console.log(response.data.message);
      toast.success("Quiz completed successfully!");
    } catch (error) {
      console.error("Error updating quiz score:", error);
    }
  };

  const handleRestart = () => {
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTotalScore(0);
  };

  if (quizCompleted) {
    return (
      <>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-orange-500">Quiz Completed</h2>
          <p className="text-lg mt-4 text-orange-400">
            Your total score is: {totalScore}
          </p>
        </div>
        <div className="space-y-6">
          {questions.map((question, index) => {
            const isCorrect = selectedAnswers[index] === question.correctAnswer;
            return (
              <div key={index} className="p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-300">
                  {index + 1}. {question.question}
                </h3>
                <div className="mt-2 space-y-2">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selectedAnswers[index] === optionIndex;
                    const isCorrectOption =
                      question.correctAnswer === optionIndex;

                    let optionClass = "flex items-center space-x-2";
                    if (isSelected) {
                      optionClass += isCorrectOption
                        ? " text-green-500"
                        : " text-red-500";
                    } else if (isCorrectOption) {
                      optionClass += " text-green-500";
                    } else {
                      optionClass += " text-orange-400";
                    }

                    return (
                      <div key={optionIndex} className={optionClass}>
                        <input
                          type="radio"
                          disabled
                          checked={isSelected}
                          className={`form-radio ${
                            isSelected
                              ? isCorrectOption
                                ? "text-green-500"
                                : "text-red-500"
                              : isCorrectOption
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        />
                        <span>{option}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2">
                  {isCorrect ? (
                    <p className="text-green-500 font-medium">Correct!</p>
                  ) : (
                    <p className="text-red-500 font-medium">
                      Incorrect! The correct answer is:{" "}
                      <span className="font-bold">
                        {question.options[question.correctAnswer]}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={handleRestart}
            className="px-6 py-2 mb-8 bg-orange-500 text-black font-semibold rounded-lg shadow-md hover:bg-orange-400 transition duration-200"
          >
            Restart
          </button>
        </div>
      </>
    );
  }

  if (!quizStarted) {
    return (
      <div className="text-center mt-9 mx-4">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-orange-500">
            Quiz Instructions
          </h1>
          <ul className="text-left text-gray-300 space-y-2">
            <li>
              📋 The quiz consists of{" "}
              <span className="font-semibold">30 questions</span> covering
              theory, time complexity, and real-world applications of
              algorithms.
            </li>
            <li>
              ✅ <span className="font-semibold">+10 points</span> are awarded
              for each correct answer.
            </li>
            <li>
              ❌ <span className="font-semibold">-5 points</span> are deducted
              for each incorrect answer.
            </li>
            <li>
              🚫 You <span className="font-semibold">cannot proceed</span> to
              the next question until you attempt the current question.
            </li>
            <li>
              🏆 A minimum score of{" "}
              <span className="font-semibold">150 points</span> is required to
              qualify for the certificate.
            </li>
            <li>
              ⏱️ Take your time to think, as there's{" "}
              <span className="font-semibold">no time limit</span> for this
              quiz.
            </li>
          </ul>
          <div className="mt-6">
            <button
              className="bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-all duration-200"
              onClick={startQuiz}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isNextDisabled = selectedAnswers[currentQuestion] === undefined;
  return (
    <div>
      <h3 className="text-lg text-center mb-4">
        Question <strong>{currentQuestion + 1}</strong> of{" "}
        <strong>{questions.length}</strong>
      </h3>
      <h3 className="text-xl font-bold mb-4 text-white">
        {currentQuestion + 1}. {question.question}
      </h3>
      <div className="space-y-2 text-white">
        {question.options.map((option, index) => (
          <label key={index} className="block">
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              value={index}
              checked={selectedAnswers[currentQuestion] === index}
              onChange={() => handleOptionChange(index)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        {currentQuestion > 0 && (
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        {currentQuestion < questions.length - 1 ? (
          <button
            className={`bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 ${
              isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

Quiz.propTypes = {
  algorithmName: PropTypes.string.isRequired,
};

export default Quiz;
