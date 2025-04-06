import FloydWarshall from "./AlgorithmTheory/FloydWarshallTheory.jsx";
import BellmanFord from "./AlgorithmTheory/BellmanFordTheory.jsx";
import PrimAlgorithm from "./AlgorithmTheory/PrimTheory.jsx";
import KruskalAlgorithm from "./AlgorithmTheory/KruskalTheory.jsx";
import DijkstraAlgorithm from "./AlgorithmTheory/DijkstraTheory.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
function Theory({ algorithmName }) {
  const [markedComplete, setMarkedComplete] = useState(false);

  const handleMarkAsComplete = async () => {
    try {
      const response = await axios.patch(
        `https://algovisual-8uc4.onrender.com/api/user-tracking/theory`,
        {
          algorithmName,
        }
      );
      if (response.status === 200) {
        setMarkedComplete(true);
        toast.success("Theory completed.");
      }
    } catch (error) {
      console.error("Error marking theory as complete:", error);
      alert("Failed to mark as complete. Please try again.");
    }
  };
  const renderAlgorithmTheory = () => {
    switch (algorithmName) {
      case "Floyd-Warshall Algorithm":
        return <FloydWarshall />;
      case "Bellman-Ford Algorithm":
        return <BellmanFord />;
      case "prim":
        return <PrimAlgorithm />;
      case "Kruskal's Algorithm":
        return <KruskalAlgorithm />;
      case "Dijkstra's Algorithm":
        return <DijkstraAlgorithm />;
      default:
        return <p>Please select an algorithm to view its theory.</p>;
    }
  };

  return (
    <div className="rounded-md">
      {renderAlgorithmTheory()}
      <button
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        onClick={handleMarkAsComplete}
        disabled={markedComplete}
      >
        {markedComplete ? "Marked as Complete" : "Mark as Complete"}
      </button>
    </div>
  );
}

Theory.propTypes = {
  algorithmName: PropTypes.string.isRequired,
};
export default Theory;
