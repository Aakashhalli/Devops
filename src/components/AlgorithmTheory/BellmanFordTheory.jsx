import { useState } from "react";

const BellmanFordTheory = () => {
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [showAlgorithm, setShowAlgorithm] = useState(false);
  const [showComplexity, setShowComplexity] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showAdvantages, setShowAdvantages] = useState(false);
  const [showDisadvantages, setShowDisadvantages] = useState(false);
  const [showConclusion, setShowConclusion] = useState(false);

  return (
    <div className="text-blue-300 bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Bellman-Ford Algorithm
      </h2>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-blue-400"
          onClick={() => setShowIntroduction(!showIntroduction)}
        >
          Introduction {showIntroduction ? "-" : "+"}
        </h3>
        {showIntroduction && (
          <p className="mt-2 text-gray-300">
            {`The Bellman-Ford algorithm is a dynamic programming approach for
            finding the shortest path in a graph. Unlike Dijkstra's algorithm,
            it can handle graphs with negative weight edges and detect negative
            weight cycles.`}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-blue-400"
          onClick={() => setShowAlgorithm(!showAlgorithm)}
        >
          Algorithm Steps {showAlgorithm ? "-" : "+"}
        </h3>
        {showAlgorithm && (
          <ol className="mt-2 list-decimal pl-5 text-gray-300">
            <li>
              Initialize the distance to the source vertex as 0 and all other
              distances as infinity.
            </li>
            <li>
              For each vertex, relax all edges to check if distances can be
              improved.
            </li>
            <li>
              Repeat this process for V - 1 iterations, where V is the number of
              vertices.
            </li>
            <li>
              Perform one more relaxation pass to check for negative weight
              cycles.
            </li>
          </ol>
        )}
      </div>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-blue-400"
          onClick={() => setShowComplexity(!showComplexity)}
        >
          Complexity Analysis {showComplexity ? "-" : "+"}
        </h3>
        {showComplexity && (
          <ul className="mt-2 list-disc pl-5 text-gray-300">
            <li>
              <strong>Time Complexity:</strong> O(V * E), where V is the number
              of vertices and E is the number of edges.
            </li>
            <li>
              <strong>Auxiliary Space:</strong> O(V).
            </li>
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-blue-400"
          onClick={() => setShowApplications(!showApplications)}
        >
          Applications {showApplications ? "-" : "+"}
        </h3>
        {showApplications && (
          <ul className="mt-2 list-disc pl-5 text-gray-300">
            <li>
              Single-Source Shortest Path in graphs with negative weights.
            </li>
            <li>
              Network routing protocols like RIP (Routing Information Protocol).
            </li>
            <li>Detecting negative weight cycles in graphs or networks.</li>
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-blue-400"
          onClick={() => setShowAdvantages(!showAdvantages)}
        >
          Advantages {showAdvantages ? "-" : "+"}
        </h3>
        {showAdvantages && (
          <ul className="mt-2 list-disc pl-5 text-gray-300">
            <li>Handles graphs with negative edge weights.</li>
            <li>Simple to implement and understand.</li>
            <li>Detects negative weight cycles.</li>
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-blue-400"
          onClick={() => setShowDisadvantages(!showDisadvantages)}
        >
          Disadvantages {showDisadvantages ? "-" : "+"}
        </h3>
        {showDisadvantages && (
          <ul className="mt-2 list-disc pl-5 text-gray-300">
            <li>
              {`Slower than Dijkstra's algorithm for graphs without negative
              weights.`}
            </li>
            <li>Not optimal for dense graphs due to high time complexity.</li>
            <li>
              O(V * E) time complexity makes it less efficient for large graphs.
            </li>
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-blue-400"
          onClick={() => setShowConclusion(!showConclusion)}
        >
          Conclusion {showConclusion ? "-" : "+"}
        </h3>
        {showConclusion && (
          <p className="mt-2 text-gray-300">
            {`The Bellman-Ford algorithm is essential for finding shortest paths
            in graphs with negative edge weights and detecting negative cycles.
            Though slower than alternatives like Dijkstra's algorithm, it excels
            in scenarios requiring these capabilities.`}
          </p>
        )}
      </div>
    </div>
  );
};

export default BellmanFordTheory;
