import { useState } from "react";

const PrimTheory = () => {
  const [showAlgorithm, setShowAlgorithm] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showAdvantages, setShowAdvantages] = useState(false);
  const [showDisadvantages, setShowDisadvantages] = useState(false);
  const [showConclusion, setShowConclusion] = useState(false);

  return (
    <div className="text-orange-300 bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        {`Prim's Algorithm`}
      </h2>

      <p className="mb-4">
        {`Prim's algorithm is a greedy algorithm used to find a minimum spanning tree (MST) for a weighted undirected graph. The algorithm starts with an empty spanning tree and gradually builds the MST by selecting the minimum weight edge connecting a tree vertex to a fringe vertex.`}
      </p>

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
              Determine an arbitrary vertex as the starting vertex of the MST.
            </li>
            <li>Repeat steps until all vertices are included in the MST:</li>
            <li>Find edges connecting tree vertices with fringe vertices.</li>
            <li>Choose the minimum weight edge and add it to the MST.</li>
            <li>Mark the connected vertex as included in the MST.</li>
            <li>Return the MST.</li>
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
          <ul className="mt-2 list-disc pl-5">
            <li>Network Design: Designing cost-efficient connections.</li>
            <li>Telecommunication: Optimizing network layouts.</li>
            <li>Civil Engineering: Laying pipelines and roads efficiently.</li>
            <li>Computer Networks: Optimizing data transmission.</li>
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
            <li>Guaranteed to find the MST in connected graphs.</li>
            <li>Relatively simple to understand and implement.</li>
            <li>Optimal solution for minimum spanning trees.</li>
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
            <li>Can be slow on dense graphs.</li>
            <li>Relies on a priority queue, which can be memory intensive.</li>
            <li>Choice of starting vertex affects output.</li>
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
            {`Prim's algorithm is a powerful greedy algorithm for finding the MST of a connected graph. While it has its limitations, it remains a reliable choice for many applications requiring minimum cost spanning trees.`}
          </p>
        )}
      </div>
    </div>
  );
};

export default PrimTheory;
