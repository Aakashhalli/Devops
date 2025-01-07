import { useState } from "react";

const DijkstraTheory = () => {
  const [showAlgorithm, setShowAlgorithm] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showAdvantages, setShowAdvantages] = useState(false);
  const [showDisadvantages, setShowDisadvantages] = useState(false);
  const [showConclusion, setShowConclusion] = useState(false);

  return (
    <div className="text-orange-300 bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        {`Dijkstra's Algorithm`}
      </h2>

      <p className="mb-4">
        The algorithm maintains a set of visited vertices and a set of unvisited
        vertices. It starts at the source vertex and iteratively selects the
        unvisited vertex with the smallest tentative distance from the source.
        It then visits the neighbors of this vertex and updates their tentative
        distances if a shorter path is found. This process continues until the
        destination vertex is reached, or all reachable vertices have been
        visited.
      </p>

      <p className="mb-4">
        Dijkstra’s algorithm works on both directed and undirected graphs, as
        long as they have non-negative edge weights and are connected.
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
              Mark the source node with a current distance of 0 and the rest
              with infinity.
            </li>
            <li>
              Set the non-visited node with the smallest current distance as the
              current node.
            </li>
            <li>
              For each neighbor of the current node, update its distance if a
              shorter path is found.
            </li>
            <li>Mark the current node as visited.</li>
            <li>
              Repeat until all nodes are visited or the shortest path is found.
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
          <ul className="mt-2 list-disc pl-5">
            <li>Digital Mapping Services (e.g., Google Maps).</li>
            <li>Social Networking Applications.</li>
            <li>Telephone Network Optimization.</li>
            <li>IP Routing (OSPF).</li>
            <li>Flight Scheduling.</li>
            <li>File Server Designation (LAN).</li>
            <li>Robotic Pathfinding.</li>
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
            <li>Efficiency: Finds the shortest path quickly.</li>
            <li>Versatility: Applicable to various domains.</li>
            <li>Optimal Solution: Provides minimum cost paths.</li>
            <li>Simple Implementation.</li>
            <li>Handles Large Graphs efficiently.</li>
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
            <li>Computational Complexity: Slow on dense graphs.</li>
            <li>Not Suitable for Negative Weights.</li>
            <li>Memory Intensive for complex graphs.</li>
            <li>Limited to Non-Directional Graphs.</li>
            <li>Overkill for Small Graphs.</li>
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
            Dijkstra’s Algorithm is efficient and straightforward for finding
            shortest paths in graphs with non-negative edge weights. However, it
            is not suitable for graphs with negative weights or cycles.
            Alternatives like Bellman-Ford or Floyd-Warshall may be better
            suited for such cases.
          </p>
        )}
      </div>
    </div>
  );
};

export default DijkstraTheory;
