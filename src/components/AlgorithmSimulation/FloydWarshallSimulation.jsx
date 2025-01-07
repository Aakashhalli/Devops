import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
function FloydWarshallSimulation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomGraph, setIsCustomGraph] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [exampleGraphMatrix, setExampleGraphMatrix] = useState([
    [0, 3, Infinity, 7],
    [8, 0, 2, Infinity],
    [5, Infinity, 0, 1],
    [2, Infinity, Infinity, 0],
  ]);
  const [updatedMatrix, setUpdatedMatrix] = useState([]);
  const [k, setK] = useState(0);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [step, setStep] = useState(0);
  const [historyStack, setHistoryStack] = useState([]); // Stack to store history
  const [showTheory, setShowTheory] = useState(false);
  const nodes = ["A", "B", "C", "D"];

  const resetToExampleGraph = () => {
    setExampleGraphMatrix([
      [0, 3, Infinity, 7],
      [8, 0, 2, Infinity],
      [5, Infinity, 0, 1],
      [2, Infinity, Infinity, 0],
    ]);
    setIsCustomGraph(false);
    setK(0);
    setI(0);
    setJ(0);
    setStep(0);
    setUpdatedMatrix([]);
    setShowTheory(false);
    setShowMatrix(false);
  };

  const handleStart = () => {
    setUpdatedMatrix([...exampleGraphMatrix]);
    setShowMatrix(true);
  };

  const markSimulationCompleted = async () => {
    try {
      const response = await axios.patch("/api/user-tracking/simulation", {
        algorithmName: "Floyd-Warshall Algorithm",
      });
      if (response.status === 200) {
        toast.success("Floyd-Warshall Algorithm completed!");
      }
    } catch (error) {
      console.error("Error marking simulation as complete:", error);
      alert("Failed to mark simulation as complete. Please try again.");
    }
  };
  const resetSimulation = () => {
    // Reset all states to their initial values
    setExampleGraphMatrix([
      [0, 3, Infinity, 7],
      [8, 0, 2, Infinity],
      [5, Infinity, 0, 1],
      [2, Infinity, Infinity, 0],
    ]);
    setIsCustomGraph(false);
    setK(0);
    setI(0);
    setJ(0);
    setStep(0);
    setUpdatedMatrix([]);
    setShowMatrix(false);
    setHistoryStack([]); // Clear the history stack
    setShowTheory(false); // Hide theory explanation
    console.log("Simulation reset to initial state.");
  };

  const handleNext = () => {
    const n = updatedMatrix.length; // Number of nodes

    // Exit if all iterations are complete
    if (k >= n) {
      console.log("All iterations are complete");
      return;
    }

    // Clone the updatedMatrix to avoid direct state mutation
    const updatedMatrixClone = updatedMatrix.map((row) => [...row]);

    // Save the current state to the history stack before making changes
    setHistoryStack([
      ...historyStack,
      { matrix: updatedMatrix.map((row) => [...row]), k, i, j },
    ]);

    if (j < n) {
      // Calculate the new distance for updatedMatrix[i][j]
      const newDistance =
        updatedMatrixClone[i][k] === Infinity ||
        updatedMatrixClone[k][j] === Infinity
          ? updatedMatrixClone[i][j]
          : Math.min(
              updatedMatrixClone[i][j],
              updatedMatrixClone[i][k] + updatedMatrixClone[k][j]
            );

      // Update the matrix only if a shorter distance is found
      if (newDistance < updatedMatrixClone[i][j]) {
        updatedMatrixClone[i][j] = newDistance;
        setShowTheory(true); // Show theory explanation
      } else {
        setShowTheory(false); // Hide theory if no value is updated
      }

      setUpdatedMatrix(updatedMatrixClone); // Update the matrix state
      setJ(j + 1); // Move to the next column
    } else if (i < n - 1) {
      // Move to the next row if j exceeds its range
      setJ(0);
      setI(i + 1);
    } else {
      // Reset row and column counters and move to the next intermediate node
      setI(0);
      setJ(0);
      setK(k + 1);

      // If k reaches n after this update, log completion
      if (k + 1 >= n) {
        console.log("Simulation complete. All iterations are finished.");
        resetSimulation();
        markSimulationCompleted();
      }
    }
  };

  const handlePrevious = () => {
    if (historyStack.length === 0) {
      console.log("No previous state to go back to.");
      return;
    }

    // Pop the last state from the history stack
    const lastState = historyStack.pop();

    // Restore the previous state
    setUpdatedMatrix(lastState.matrix);
    setK(lastState.k);
    setI(lastState.i);
    setJ(lastState.j);

    // Update the history stack after popping
    setHistoryStack([...historyStack]);

    // Hide theory explanation when moving backward
    setShowTheory(false);
  };

  return (
    <div className="p-6 bg-black text-orange-500 min-h-[70vh] flex flex-col justify-center items-center">
      {/* Pseudo-code */}
      {showMatrix && (
        <div className="mb-6 p-4 bg-orange-500 text-black rounded-lg">
          <pre>
            For k = 0 to n - 1{"\n"}
            {"    "}For i = 0 to n - 1{"\n"}
            {"        "}For j = 0 to n - 1{"\n"}
            {"            "}Distance[i, j] = min(Distance[i, j], Distance[i, k]
            + Distance[k, j])
          </pre>
        </div>
      )}
      <div className="flex w-full">
        {/* SVG Graph */}
        <div className="rounded-lg bg-black w-2/3 h-96 flex items-center justify-center mb-8 relative">
          <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
            {/* Edges with Weights */}
            {/* 1 -> 2 */}
            <line
              x1="150"
              y1="90"
              x2="333"
              y2="90"
              stroke="orange"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <text x="250" y="120" fill="orange" fontSize="14">
              3
            </text>

            {/* 1 -> 4 */}
            <line
              x1="143"
              y1="97"
              x2="95"
              y2="280"
              stroke="orange"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <text x="100" y="200" fill="orange" fontSize="14">
              7
            </text>

            {/* 2 -> 1 */}
            <line
              x1="350"
              y1="105"
              x2="170"
              y2="105"
              stroke="orange"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <text x="235" y="85" fill="orange" fontSize="14">
              8
            </text>

            {/* 2 -> 3 */}
            <line
              x1="350"
              y1="100"
              x2="310"
              y2="280"
              stroke="orange"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <text x="335" y="200" fill="orange" fontSize="14">
              2
            </text>

            {/* 3 -> 1 */}
            <line
              x1="300"
              y1="300"
              x2="163"
              y2="118"
              stroke="orange"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <text x="210" y="210" fill="orange" fontSize="14">
              5
            </text>

            {/* 3 -> 4 */}
            <line
              x1="300"
              y1="300"
              x2="120"
              y2="300"
              stroke="orange"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <text x="200" y="315" fill="orange" fontSize="14">
              1
            </text>

            {/* 4 -> 1 */}
            <line
              x1="104"
              y1="305"
              x2="152"
              y2="120"
              stroke="orange"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
            <text x="140" y="210" fill="orange" fontSize="14">
              2
            </text>

            {/* Arrowhead Definition */}
            <defs>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="10"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 Z" fill="orange" />
              </marker>
            </defs>

            {/* Nodes */}
            <circle
              cx="150"
              cy="100"
              r="20"
              fill={showMatrix && k === 0 ? "blue" : "orange"}
            />
            <text x="145" y="105" fill="black" fontSize="14" fontWeight="bold">
              A
            </text>

            <circle
              cx="350"
              cy="100"
              r="20"
              fill={k === 1 ? "blue" : "orange"}
            />
            <text x="345" y="105" fill="black" fontSize="14" fontWeight="bold">
              B
            </text>

            <circle
              cx="300"
              cy="300"
              r="20"
              fill={k === 2 ? "blue" : "orange"}
            />
            <text x="295" y="305" fill="black" fontSize="14" fontWeight="bold">
              C
            </text>

            <circle
              cx="100"
              cy="300"
              r="20"
              fill={k === 3 ? "blue" : "orange"}
            />
            <text x="95" y="305" fill="black" fontSize="14" fontWeight="bold">
              D
            </text>
          </svg>
        </div>

        {/* Original Distance Matrix */}
        {showMatrix && (
          <div className="text-white rounded-lg p-4 ml-8">
            <h3 className="text-center mb-2">Original Matrix</h3>
            <table className="table-auto border-collapse border border-orange-500">
              <thead>
                <tr>
                  <th className="border border-orange-500 px-4 py-2"></th>
                  {nodes.map((node, index) => (
                    <th
                      key={index}
                      className="border border-orange-500 px-4 py-2"
                    >
                      {node}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exampleGraphMatrix.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    <td className="border font-bold border-orange-500 px-4 py-2">
                      {nodes[rowIdx]}
                    </td>
                    {row.map((value, colIdx) => (
                      <td
                        key={colIdx}
                        className={`border border-orange-500 px-4 py-2 ${
                          rowIdx === k || colIdx === k
                            ? "bg-blue-500 text-black"
                            : ""
                        }`}
                      >
                        {value === Infinity ? "∞" : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Updated Distance Matrix */}
        {showMatrix && (
          <div className="text-white rounded-lg p-4 ml-8">
            <h3 className="text-center mb-2">Updated Matrix</h3>
            <table className="table-auto border-collapse border border-orange-500">
              <thead>
                <tr>
                  <th className="border border-orange-500 px-4 py-2"></th>
                  {nodes.map((node, index) => (
                    <th
                      key={index}
                      className="border border-orange-500 px-4 py-2"
                    >
                      {node}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {updatedMatrix.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    <td className="border font-bold border-orange-500 px-4 py-2">
                      {nodes[rowIdx]}
                    </td>
                    {row.map((value, colIdx) => (
                      <td
                        key={colIdx}
                        className={`border border-orange-500 px-4 py-2 ${
                          rowIdx === k || colIdx === k
                            ? "bg-blue-500 text-black"
                            : ""
                        }`}
                      >
                        {value === Infinity ? "∞" : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Formula and Current Variables */}
      {showMatrix && (
        <div className="text-white">
          <p>
            Formula: Distance[{i}][{j == 4 ? 3 : j}] = min(Distance[{i}][
            {j == 4 ? 3 : j}], Distance[{i}][{k}] + Distance[{k}][
            {j == 4 ? 3 : j}])
          </p>
          <p>
            Current Iteration: k = {k}, i = {i}, j = {j == 4 ? 3 : j}
          </p>
          <p>
            Calculation: Distance[{i}][{j == 4 ? 3 : j}] = min(
            {updatedMatrix[i][j == 4 ? 3 : j] === Infinity
              ? "∞"
              : updatedMatrix[i][j == 4 ? 3 : j]}
            , {updatedMatrix[i][k] === Infinity ? "∞" : updatedMatrix[i][k]}+
            {updatedMatrix[k][j == 4 ? 3 : j] === Infinity
              ? "∞"
              : updatedMatrix[k][j == 4 ? 3 : j]}
            )
          </p>
          <p>
            Result: Distance[{i}][{j == 4 ? 3 : j}] ={" "}
            {Math.min(
              updatedMatrix[i][j == 4 ? 3 : j],
              updatedMatrix[i][k] + updatedMatrix[k][j == 4 ? 3 : j]
            )}
          </p>
        </div>
      )}

      {/* Formula and Current Variables
      {showMatrix && (
        <div className=" text-white">
          <p>
            Formula: Distance[{i}][{j}] = min(Distance[{i}][{j}], Distance[{i}][
            {k}] + Distance[{k}][{j}])
          </p>
          <p>
            Current Iteration: k = {k}, i = {i}, j = {j}
          </p>
        </div>
      )} */}

      {/* Buttons */}
      <div className="flex justify-between w-full max-w-xl mt-4">
        {!showMatrix && (
          <>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-black transition duration-300"
            >
              Edit Graph
            </button>

            <button
              onClick={handleStart}
              className="px-6 py-3 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-black transition duration-300"
            >
              Start
            </button>
          </>
        )}

        {showMatrix && (
          <>
            <button
              onClick={handlePrevious}
              className="px-6 py-3 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-black transition duration-300"
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-3 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-black transition duration-300"
            >
              Next
            </button>
          </>
        )}
      </div>
      {/* Explanation */}
      {showTheory && (
        <div className="mt-4 text-white bg-gray-800 p-4 rounded-lg">
          <p>
            Updated Distance[{i}][{j == 4 ? 3 : j}] because using node{" "}
            {nodes[k]} as an intermediate node provided a shorter path.
          </p>
        </div>
      )}
      {/* {showTheory && (
        <div className="mt-4 text-white bg-gray-800 p-4 rounded-lg">
          <p>
            Updated Distance[{i}][{j}] because using node {nodes[k]} as an
            intermediate node provided a shorter path.
          </p>
        </div>
      )} */}
    </div>
  );
}

export default FloydWarshallSimulation;
