import { useState } from "react";

const FloydWarshallTheory = () => {
  const [showAlgorithm, setShowAlgorithm] = useState(false);
  const [showComplexity, setShowComplexity] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showAdvantages, setShowAdvantages] = useState(false);
  const [showDisadvantages, setShowDisadvantages] = useState(false);
  const [showConclusion, setShowConclusion] = useState(false);

  return (
    <div className="text-orange-300 bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        {`Floyd-Warshall Algorithm`}
      </h2>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-orange-400"
          onClick={() => setShowAlgorithm(!showAlgorithm)}
        >
          Algorithm Steps {showAlgorithm ? "-" : "+"}
        </h3>
        {showAlgorithm && (
          <ul className="mt-2 list-disc pl-5">
            <li>
              Initialize the solution matrix the same as the input graph matrix
              as the first step.
            </li>
            <li>
              Update the solution matrix by considering all vertices as
              intermediate vertices.
            </li>
            <li>
              For every pair (i, j) of source and destination vertices, check
              two cases:
              <ul className="list-disc pl-5">
                <li>
                  If k is not an intermediate vertex: Keep{" "}
                  <code>dist[i][j]</code> as is.
                </li>
                <li>
                  If k is an intermediate vertex: Update <code>dist[i][j]</code>{" "}
                  as <code>dist[i][k] + dist[k][j]</code> if it reduces the
                  current value.
                </li>
              </ul>
            </li>
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
          <div className="mt-2">
            <p>
              <strong>Time Complexity:</strong> O(V<sup>3</sup>)
            </p>
            <p>
              <strong>Space Complexity:</strong> O(V<sup>2</sup>)
            </p>
          </div>
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
          <ul className="mt-2 list-disc pl-5">
            <li>All-Pairs Shortest Path in transportation networks.</li>
            <li>
              Finding Transitive Closures to determine reachability in graphs.
            </li>
            <li>
              Solving shortest path problems in dense graphs or network routing.
            </li>
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
          <ul className="mt-2 list-disc pl-5">
            <li>Handles negative edge weights efficiently.</li>
            <li>Provides shortest paths between all vertex pairs.</li>
            <li>Simple to implement for dense graphs.</li>
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
          <ul className="mt-2 list-disc pl-5">
            <li>
              High time complexity: O(V<sup>3</sup>).
            </li>
            <li>Memory intensive for large graphs.</li>
            <li>Cannot handle negative weight cycles.</li>
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h3
          className="text-lg font-semibold cursor-pointer hover:text-orange-400"
          onClick={() => setShowConclusion(!showConclusion)}
        >
          Conclusion {showConclusion ? "-" : "+"}
        </h3>
        {showConclusion && (
          <p className="mt-2">
            Floyd-Warshall is a powerful algorithm for finding shortest paths
            between all vertex pairs in a graph. Its simplicity and
            applicability to dense graphs make it ideal for many practical
            applications. However, its cubic time complexity limits scalability
            for very large graphs.
          </p>
        )}
      </div>
    </div>
  );
};

export default FloydWarshallTheory;
