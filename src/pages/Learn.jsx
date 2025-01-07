// // import React from "react";
// import { Link } from "react-router-dom";
// const algorithms = [
//   {
//     id: 1,
//     name: "Dijkstra's Algorithm",
//     route: "/learn/dijkstra", // Match "dijkstra" for the switch case
//     image: "./dijkstra.jpg",
//   },
//   // {
//   //   id: 2,
//   //   name: "Prim's Algorithm",
//   //   route: "/learn/prim", // Match "prim"
//   //   image: "./prim.jpg",
//   // },
//   // {
//   //   id: 3,
//   //   name: "Kruskal's Algorithm",
//   //   route: "/learn/kruskal", // Match "kruskal"
//   //   image: "./kruskal.jpg",
//   // },
//   {
//     id: 4,
//     name: "Bellman-Ford Algorithm",
//     route: "/learn/bellman-ford", // Match "bellman-ford"
//     image: "./bellmanFord.jpg",
//   },
//   {
//     id: 5,
//     name: "Floyd-Warshall Algorithm",
//     route: "/learn/floyd-warshall", // Match "floyd-warshall"
//     image: "./floydWarshall.jpg",
//   },
// ];

// const Learn = () => {
//   return (
//     <div className="p-6 bg-black text-orange-500 min-h-[70vh]">
//       <h1 className="text-4xl font-bold mb-8 mt-3 text-center">
//         Graph Algorithms
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
//         {algorithms.map((algorithm) => (
//           <div
//             key={algorithm.id}
//             className="bg-black bg-opacity-40 hover:border hover:bg-[#151515] border-orange-500 p-6 rounded-lg flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform"
//           >
//             <img
//               src={algorithm.image}
//               alt={`${algorithm.name}`}
//               className="w-full h-32 object-cover rounded-md mb-4"
//             />
//             {/* <h2 className="text-lg font-bold mb-2">{algorithm.name}</h2> */}
//             <Link
//               to={algorithm.route}
//               className="text-lg text-orange-400 underline hover:text-orange-500"
//             >
//               Learn
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Learn;

import { Link } from "react-router-dom";

const algorithms = [
  {
    id: 1,
    name: "Dijkstra's Algorithm",
    route: "/learn/dijkstra",
    image: "./dijkstra.jpg",
  },
  {
    id: 4,
    name: "Bellman-Ford Algorithm",
    route: "/learn/bellman-ford",
    image: "./bellmanFord.jpg",
  },
  {
    id: 5,
    name: "Floyd-Warshall Algorithm",
    route: "/learn/floyd-warshall",
    image: "./floydWarshall.jpg",
  },
];

const Learn = () => {
  return (
    <div className="p-6 bg-black text-orange-500 min-h-[70vh]">
      {/* <h1 className="text-4xl font-bold mb-8 mt-3 text-center">
        Graph Algorithms
      </h1> */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {algorithms.map((algorithm, index) => (
          <div
            key={algorithm.id}
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center bg-black bg-opacity-40    p-6 rounded-lg transition-transform`}
          >
            {/* Algorithm Title Section */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-orange-400 mb-4">
                {algorithm.name}
              </h2>
              <p className="text-lg text-[#CED0CE] mb-4">
                Start learning about {algorithm.name + " "} with the help of
                simulation, theory, and quizzes.
              </p>
              <Link
                to={algorithm.route}
                className="text-black bg-orange-500 hover:bg-black hover:text-orange-500 px-4 py-2 rounded-full text-sm font-semibold transition-all"
              >
                Learn More
              </Link>
            </div>

            {/* Image Section */}
            <div className="flex-shrink-0 w-full md:w-1/3 md:ml-6 md:mr-6">
              <div className="bg-[#0f0f0f] p-4 rounded-md flex items-center justify-center">
                <img
                  src={algorithm.image}
                  alt={`${algorithm.name}`}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
