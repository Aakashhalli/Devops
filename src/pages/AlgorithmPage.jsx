import { useState } from "react";
import PropTypes from "prop-types";
import Simulation from "../components/Siumlation.jsx";
import Theory from "../components/Theory.jsx";
import Quiz from "../components/Quiz.jsx";
const AlgorithmPage = ({ algorithmName }) => {
  const [activeTab, setActiveTab] = useState("simulation");

  const renderTabContent = () => {
    switch (activeTab) {
      case "simulation":
        return <Simulation algorithmName={algorithmName} />;
      case "theory":
        return <Theory algorithmName={algorithmName} />;
      case "quiz":
        return <Quiz algorithmName={algorithmName} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-black text-orange-500 min-h-[70vh]">
      {/* <h1 className="text-4xl font-bold text-center mb-8">{algorithmName}</h1> */}
      <div className="flex justify-center space-x-8 mb-8 border-b border-orange-500">
        <button
          onClick={() => setActiveTab("simulation")}
          className={`pb-2 ${
            activeTab === "simulation"
              ? "border-b-2 border-orange-500 text-orange-300"
              : "text-orange-500 hover:text-orange-300"
          }`}
        >
          Simulation
        </button>
        <button
          onClick={() => setActiveTab("theory")}
          className={`pb-2 ${
            activeTab === "theory"
              ? "border-b-2 border-orange-500 text-orange-300"
              : "text-orange-500 hover:text-orange-300"
          }`}
        >
          Theory
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`pb-2 ${
            activeTab === "quiz"
              ? "border-b-2 border-orange-500 text-orange-300"
              : "text-orange-500 hover:text-orange-300"
          }`}
        >
          Quiz
        </button>
      </div>
      <div className="bg-black bg-opacity-40 border-orange-500  rounded-lg">
        {renderTabContent()}
      </div>
    </div>
  );
};
AlgorithmPage.propTypes = {
  algorithmName: PropTypes.string.isRequired,
};
export default AlgorithmPage;
