import { useState } from "react";

const KruskalTheory = () => {
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [showAlgorithm, setShowAlgorithm] = useState(false);
  const [showComplexity, setShowComplexity] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showAdvantages, setShowAdvantages] = useState(false);
  const [showDisadvantages, setShowDisadvantages] = useState(false);

  return (
    <div className="text-orange-300 bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">{`Kruskal's Algorithm`}</h2>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-orange-400"
          onClick={() => setShowIntroduction(!showIntroduction)}
        >
          Introduction {showIntroduction ? "-" : "+"}
        </h3>
        {showIntroduction && (
          <p className="mt-2 text-gray-300">
            {`Kruskal's algorithm is a greedy algorithm used to find the Minimum
            Spanning Tree (MST) of a graph. It adds edges in increasing order of
            their weights while ensuring no cycles are formed.`}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-orange-400"
          onClick={() => setShowAlgorithm(!showAlgorithm)}
        >
          Algorithm Steps {showAlgorithm ? "-" : "+"}
        </h3>
        {showAlgorithm && (
          <ul className="mt-2 list-disc pl-5 text-gray-300">
            <li>Sort all edges in the graph by their weights.</li>
            <li>
              Initialize a disjoint-set data structure to track connected
              components.
            </li>
            <li>
              For each edge, add it to the MST if it connects two different
              components.
            </li>
            <li>Repeat until there are V-1 edges in the MST.</li>
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-orange-400"
          onClick={() => setShowComplexity(!showComplexity)}
        >
          Complexity Analysis {showComplexity ? "-" : "+"}
        </h3>
        {showComplexity && (
          <ul className="mt-2 list-disc pl-5 text-gray-300">
            <li>
              <strong>Time Complexity:</strong> O(E log E) or O(E log V).
            </li>
            <li>
              <strong>Auxiliary Space:</strong> O(V + E).
            </li>
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-orange-400"
          onClick={() => setShowApplications(!showApplications)}
        >
          Applications {showApplications ? "-" : "+"}
        </h3>
        {showApplications && (
          <ul className="mt-2 list-disc pl-5 text-gray-300">
            <li>
              Network Design: Create optimal computer and telecommunication
              networks.
            </li>
            <li>Cluster Analysis: Used in hierarchical clustering.</li>
            <li>Geographical Mapping: Model road networks, pipelines, etc.</li>
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-orange-400"
          onClick={() => setShowAdvantages(!showAdvantages)}
        >
          Advantages {showAdvantages ? "-" : "+"}
        </h3>
        {showAdvantages && (
          <ul className="mt-2 list-disc pl-5 text-gray-300">
            <li>Handles both sparse and dense graphs efficiently.</li>
            <li>Conceptually simple and easy to implement.</li>
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-orange-400"
          onClick={() => setShowDisadvantages(!showDisadvantages)}
        >
          Disadvantages {showDisadvantages ? "-" : "+"}
        </h3>
        {showDisadvantages && (
          <ul className="mt-2 list-disc pl-5 text-gray-300">
            <li>
              Requires sorting of edges, which can be slow for large graphs.
            </li>
            <li>Not suitable for directed graphs.</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default KruskalTheory;
