import PropTypes from "prop-types";
import DijkstraSimulation from "./AlgorithmSimulation/DijkstraSimulation";
import FloydWarshallSimulation from "./AlgorithmSimulation/FloydWarshallSimulation";
import BellmanFordSimulation from "./AlgorithmSimulation/BellmanFordSimulation";
import PrimSimulation from "./AlgorithmSimulation/PrimSimulation";
import KruskalSimulation from "./AlgorithmSimulation/KruskalSimulation";

function Simulation({ algorithmName }) {
  const renderAlgorithmSimulation = () => {
    switch (algorithmName) {
      case "Floyd-Warshall Algorithm":
        return <FloydWarshallSimulation />;
      case "Bellman-Ford Algorithm":
        return <BellmanFordSimulation />;
      case "prim":
        return <PrimSimulation />;
      case "Kruskal's Algorithm":
        return <KruskalSimulation />;
      case "Dijkstra's Algorithm":
        return <DijkstraSimulation />;
      default:
        return <p>Please select an algorithm to view its Simulation.</p>;
    }
  };

  return <div className=" rounded-md">{renderAlgorithmSimulation()}</div>;
}

Simulation.propTypes = {
  algorithmName: PropTypes.string.isRequired,
};
export default Simulation;
