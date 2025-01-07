import { useState } from "react";
import PropTypes from "prop-types";

const SimulationSection = ({ onClose, setGraphSvg }) => {
  const [adjacencyMatrix, setAdjacencyMatrix] = useState("");

  const handleMatrixChange = (e) => {
    setAdjacencyMatrix(e.target.value);
  };

  const handleClear = () => {
    setAdjacencyMatrix("");
  };

  const handleCreateGraph = () => {
    try {
      const rows = adjacencyMatrix
        .trim()
        .split("\n")
        .map((row) => row.split(" ").map(Number));

      const isValid = rows.every((row) => row.length === rows.length);
      if (!isValid) throw new Error("Matrix must be square and numeric.");

      const nodes = rows.map((_, index) => ({
        id: index,
        x: 200 + 100 * Math.cos((2 * Math.PI * index) / rows.length),
        y: 200 + 100 * Math.sin((2 * Math.PI * index) / rows.length),
      }));

      const edges = [];
      rows.forEach((row, i) => {
        row.forEach((weight, j) => {
          if (weight > 0) {
            edges.push({ from: i, to: j, weight });
          }
        });
      });

      const svgContent = (
        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
          {edges.map((edge, index) => (
            <line
              key={`edge-${index}`}
              x1={nodes[edge.from].x}
              y1={nodes[edge.from].y}
              x2={nodes[edge.to].x}
              y2={nodes[edge.to].y}
              stroke="orange"
              strokeWidth="2"
            />
          ))}
          {edges.map((edge, index) => (
            <text
              key={`weight-${index}`}
              x={(nodes[edge.from].x + nodes[edge.to].x) / 2}
              y={(nodes[edge.from].y + nodes[edge.to].y) / 2}
              fill="orange"
              fontSize="12"
              fontWeight="bold"
            >
              {edge.weight}
            </text>
          ))}
          {nodes.map((node, index) => (
            <circle key={index} cx={node.x} cy={node.y} r="15" fill="orange" />
          ))}
          {nodes.map((node, index) => (
            <text
              key={`label-${index}`}
              x={node.x - 5}
              y={node.y + 5}
              fill="black"
              fontSize="12"
              fontWeight="bold"
            >
              {String.fromCharCode(65 + index)}
            </text>
          ))}
        </svg>
      );

      setGraphSvg(svgContent); // Update graph
      onClose(); // Close modal
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-2/3 max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose} // Close modal
          className="absolute top-3 right-3 text-red-500 hover:text-red-700 font-bold text-2xl z-50"
          style={{ cursor: "pointer" }} // Ensure pointer cursor for clarity
        >
          &times;
        </button>

        <h3 className="text-lg mb-4 text-orange-500">Edit Graph</h3>
        <textarea
          value={adjacencyMatrix}
          onChange={handleMatrixChange}
          className="w-full h-40 p-2 bg-black border border-gray-600 text-white resize-none"
          placeholder="Enter adjacency matrix (e.g., 0 1 0&#10;1 0 1&#10;0 1 0)"
        ></textarea>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition"
            onClick={handleCreateGraph}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

SimulationSection.propTypes = {
  onClose: PropTypes.func.isRequired, // Correct prop type
  setGraphSvg: PropTypes.func.isRequired, // Correct prop type
};

export default SimulationSection;
