import { useState } from "react";
import SimulationSection from "../SimulationSection.jsx";
import axios from "axios";
import toast from "react-hot-toast";
const DijkstraSimulation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [graphSvg, setGraphSvg] = useState(null); // State to store the current graph SVG
  // eslint-disable-next-line no-unused-vars
  const [isCustomGraph, setIsCustomGraph] = useState(false); // Track if graph is custom or example
  const [startNode, setStartNode] = useState(""); // Starting node
  const [visitedNodes, setVisitedNodes] = useState([]); // Visited nodes array
  const [unvisitedNodes, setUnvisitedNodes] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ]);
  const [distanceTable, setDistanceTable] = useState([]); // Distance table state
  const [currentIteration, setCurrentIteration] = useState(0); // Current step index
  const [highlightedNodes, setHighlightedNodes] = useState([]); // Nodes to highlight
  const [simulationStarted, setSimulationStarted] = useState(false); // Flag for simulation
  const [startingNodeConfirmed, setStartingNodeConfirmed] = useState(false); // Flag for starting node input confirmation
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const [currentNode, setCurrentNode] = useState([]);
  const [narrationState, setNarrationState] = useState({
    text: "", // Text to display
    voice: "", // Text to speak
  });
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language
  const totalIterations = 6;
  const translations = {
    en: {
      startingNode: ({ startNode }) => `Starting node is set to ${startNode}.`,
      stepDetails: ({ currentIteration, minNode, neighborDetails }) =>
        `Iteration ${currentIteration}: The current node is ${minNode}. Neighbors are ${neighborDetails}.`,
      revertingStep: ({ currentIteration, previousNode, neighborDetails }) =>
        currentIteration > 0
          ? `Reverted to iteration ${currentIteration}. Current node is ${previousNode}. Neighbors were ${neighborDetails}.`
          : "Reverted to the initial state.",
      simulationComplete: () => "The simulation is complete.",
      alreadyAtFirstStep: () => "You are already at the first step.",
    },
    hi: {
      startingNode: ({ startNode }) => `चयनित प्रारंभिक नोड ${startNode} है।`,
      stepDetails: ({ currentIteration, minNode, neighborDetails }) =>
        `चरण ${currentIteration} में, वर्तमान नोड ${minNode} है। ${minNode} के पड़ोसी हैं: ${neighborDetails}। दूरी तालिका इन कनेक्शनों के आधार पर अपडेट की जा रही है।`,
      alreadyAtFirstStep: () =>
        "आप पहले चरण पर हैं। पीछे जाने के लिए कोई अन्य चरण नहीं है।",
      revertedToStep: ({ currentIteration, previousNode, neighbors }) =>
        `चरण ${currentIteration} पर लौटते हुए। पिछला नोड ${previousNode} था। इसके पड़ोसी थे: ${neighbors}।`,
      initialState: () => "आप प्रारंभिक स्थिति में लौट आए हैं।",
      simulationComplete: () =>
        "सिमुलेशन पूरा हो गया है! सभी नोड्स विजिट किए गए हैं।",
    },
    ka: {
      startingNode: ({ startNode }) => `ಆರಂಭ ನೋಡ್ ${startNode} ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ.`,
      stepDetails: ({ currentIteration, minNode, neighborDetails }) =>
        `ಹಂತ ${
          currentIteration + 1
        } ನಲ್ಲಿ, ಪ್ರಸ್ತುತ ನೋಡ್ ${minNode} ಆಗಿದೆ. ${minNode} ಯ ಪಕ್ಕದವರು: ${neighborDetails}. ದೂರದ ಆಕೃತಿಯನ್ನು ಈ ಸಂಪರ್ಕಗಳ ಆಧಾರದ ಮೇಲೆ ನವೀಕರಿಸಲಾಗುತ್ತಿದೆ.`,
      alreadyAtFirstStep: () =>
        "ನೀವು ಮೊದಲ ಹಂತದಲ್ಲಿದ್ದೀರಿ. ಹಿಂದಿರುಗಲು ಇನ್ನಷ್ಟು ಹಂತಗಳಿಲ್ಲ.",
      revertedToStep: ({ currentIteration, previousNode, neighbors }) =>
        `ಹಂತ ${
          currentIteration - 1
        } ಗೆ ಹಿಂದಿರುಗುತ್ತಿದೆ. ಹಿಂದಿನ ನೋಡ್ ${previousNode} ಆಗಿತ್ತು. ಅದರ ಪಕ್ಕದವರು: ${neighbors}.`,
      initialState: () => "ನೀವು ಪ್ರಾರಂಭಿಕ ಸ್ಥಿತಿಗೆ ಹಿಂದಿರುಗಿದ್ದೀರಿ.",
      simulationComplete: () =>
        "ಸಿಮ್ಯುಲೇಶನ್ ಪೂರ್ಣಗೊಂಡಿದೆ! ಎಲ್ಲಾ ನೋಡ್‌ಗಳು ಭೇಟಿಯಾದವು.",
    },
    te: {
      startingNode: ({ startNode }) =>
        `ప్రారంభ నోడ్ ${startNode} గా సెట్ చేయబడింది.`,
      stepDetails: ({ currentIteration, minNode, neighborDetails }) =>
        `దశ ${
          currentIteration + 1
        }: ప్రస్తుత నోడ్ ${minNode}. దీని పొరుగు నోడ్‌లు: ${neighborDetails}.`,
      alreadyAtFirstStep: () =>
        "మీరు మొదటి దశలో ఉన్నారు. వెనుకకు వెళ్లడానికి దశలు లేవు.",
      revertedToStep: ({ currentIteration, previousNode, neighbors }) =>
        `దశ ${
          currentIteration - 1
        } కు వెనక్కి వెళ్లారు. మునుపటి నోడ్ ${previousNode}. దీని పొరుగు నోడ్‌లు: ${neighbors}.`,
      initialState: () => "మీరు ప్రాథమిక స్థితికి తిరిగి వెళ్లారు.",
      simulationComplete: () =>
        "సిమ్యులేషన్ పూర్తయింది! అన్ని నోడ్‌లు సందర్శించబడ్డాయి.",
    },
    ta: {
      startingNode: ({ startNode }) =>
        `தொடக்க நொடாக ${startNode} அமைக்கப்பட்டுள்ளது.`,
      stepDetails: ({ currentIteration, minNode, neighborDetails }) =>
        `அடிக்கு ${
          currentIteration + 1
        }: தற்போதைய நோட் ${minNode}. இதன் அயல்நோடுகள்: ${neighborDetails}.`,
      alreadyAtFirstStep: () =>
        "நீங்கள் முதல் அடியில் இருக்கிறீர்கள். பின்னுக்கு செல்ல வேறு அடிகள் இல்லை.",
      revertedToStep: ({ currentIteration, previousNode, neighbors }) =>
        `அடிக்கு ${
          currentIteration - 1
        } திரும்புகிறோம். முந்தைய நோட் ${previousNode}. இதன் அயல்நோடுகள்: ${neighbors}.`,
      initialState: () => "நீங்கள் ஆரம்ப நிலைக்கு திரும்பிவிட்டீர்கள்.",
      simulationComplete: () =>
        "செயல்பாடு முடிந்தது! அனைத்து நோடுகளும் பார்வையிடப்பட்டுள்ளன.",
    },
    ml: {
      startingNode: ({ startNode }) =>
        `ആരംഭ നോഡ് ${startNode} ആയി സജ്ജീകരിച്ചു.`,
      stepDetails: ({ currentIteration, minNode, neighborDetails }) =>
        `പടിയാൻ ${
          currentIteration + 1
        }: നിലവിലെ നോഡ് ${minNode}. ഇതിന്റെ അയൽ നോഡുകൾ: ${neighborDetails}.`,
      alreadyAtFirstStep: () =>
        "നിങ്ങൾ ആദ്യ പടിയിൽ തന്നെ. പിന്നോട്ടു പോകാനായി മറ്റു പടികൾ ഇല്ല.",
      revertedToStep: ({ currentIteration, previousNode, neighbors }) =>
        `പടിയാൻ ${
          currentIteration - 1
        } മടക്കം. മുൻ നോഡ് ${previousNode}. അയൽ നോടുകൾ: ${neighbors}.`,
      initialState: () => "നിങ്ങൾ പ്രാരംഭ നിലയിലേക്ക് മടങ്ങി.",
      simulationComplete: () =>
        "സിമുലേഷൻ പൂർത്തിയായി! എല്ലാ നോഡുകളും സന്ദർശിച്ചിരിക്കുന്നു.",
    },
    de: {
      startingNode: ({ startNode }) =>
        `Startknoten ist auf ${startNode} gesetzt.`,
      stepDetails: ({ currentIteration, minNode, neighborDetails }) =>
        `Iteration ${
          currentIteration + 1
        }: Der aktuelle Knoten ist ${minNode}. Nachbarn sind: ${neighborDetails}.`,
      alreadyAtFirstStep: () =>
        "Sie befinden sich bereits im ersten Schritt. Es gibt keine weiteren Schritte zurück.",
      revertedToStep: ({ currentIteration, previousNode, neighbors }) =>
        `Zurück zu Schritt ${
          currentIteration - 1
        }. Vorheriger Knoten war ${previousNode}. Nachbarn waren: ${neighbors}.`,
      initialState: () => "Sie sind zum Anfangszustand zurückgekehrt.",
      simulationComplete: () =>
        "Die Simulation ist abgeschlossen! Alle Knoten wurden besucht.",
    },
  };

  // Helper to format neighbor details in different languages
  const formatNeighborDetails = (neighbors, lang) => {
    return neighbors
      .map((neighbor) => {
        if (lang === "hi") {
          return `${neighbor.node} जिसका भार ${neighbor.weight} है`;
        } else if (lang === "ka") {
          return `${neighbor.node} ಇದರ ತೂಕ ${neighbor.weight} ಆಗಿದೆ`;
        } else if (lang === "te") {
          return `${neighbor.node} దాని బరువు ${neighbor.weight}గా ఉంది`;
        } else if (lang === "ta") {
          return `${neighbor.node} உடன் எடை ${neighbor.weight}`;
        } else if (lang === "ml") {
          return `${neighbor.node} തൂക്കം ${neighbor.weight} ആണ്`;
        } else if (lang === "de") {
          return `${neighbor.node} mit einem Gewicht von ${neighbor.weight}`;
        } else {
          // Default to English
          return `${neighbor.node} with a weight of ${neighbor.weight}`;
        }
      })
      .join(", ");
  };

  // Speak text based on the selected language
  const speakText = (lang, key, params = {}) => {
    // console.log("speakText params:", { lang, key, params });

    const messages = translations[lang];
    if (!messages || !messages[key]) {
      console.error(`Missing translation for key: ${key}`);
      return;
    }

    const narration = messages[key](params); // Pass `params` directly to the function
    if (narration) {
      const utterance = new SpeechSynthesisUtterance(narration);

      // Map language codes to preferred voices
      const langToVoice = {
        hi: "hi-IN",
        ka: "kn-IN",
        te: "te-IN",
        ta: "ta-IN",
        ml: "ml-IN",
        de: "de-DE",
        en: "en-US",
      };

      // Fetch available voices
      const voices = window.speechSynthesis.getVoices();
      const preferredLangCode = langToVoice[lang] || "en-US";

      // Match voice for the given language
      const selectedVoice = voices.find(
        (voice) => voice.lang === preferredLangCode
      );
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else {
        console.warn(
          `No voice available for language: ${lang}, defaulting to English.`
        );
        utterance.lang = "en-US";
      }

      utterance.lang = preferredLangCode;
      window.speechSynthesis.speak(utterance);

      // Update narration state
      setNarrationState({ text: narration, voice: narration });
    }
  };

  const handleStartClick = () => {
    setSimulationStarted(true);
    setSimulationCompleted(false);
  };
  const initialTable = unvisitedNodes.map((node) => ({
    node,
    distance: node === startNode ? 0 : Infinity,
    previous: "",
  }));
  const handleConfirmStartingNode = () => {
    if (unvisitedNodes.includes(startNode)) {
      setVisitedNodes([]);
      setUnvisitedNodes(["A", "B", "C", "D", "E", "F"]);
      setDistanceTable(
        unvisitedNodes.map((node) => ({
          node,
          distance: node === startNode ? 0 : Infinity,
          previous: "",
        }))
      );
      setCurrentIteration(0);
      setHighlightedNodes([]);
      setStartingNodeConfirmed(true);
      speakText(selectedLanguage, "startingNode", { startNode });
    } else {
      alert("Please select a valid starting node from the graph.");
    }
  };

  const handleNextIteration = () => {
    if (unvisitedNodes.length === 0) {
      speakText("simulationComplete");
      setSimulationStarted(false);
      setHighlightedNodes([]);
      setSimulationStarted(false);
      setSimulationCompleted(false);
      setVisitedNodes([]);
      setUnvisitedNodes(["A", "B", "C", "D", "E", "F"]);
      setDistanceTable(initialTable);
      setCurrentNode([]);
      setCurrentIteration(0);
      setNarrationState({ text: "", voice: "" });

      return;
    }
    console.log(currentIteration);

    const minNode = unvisitedNodes.reduce((min, node) => {
      const nodeDistance =
        distanceTable.find((entry) => entry.node === node)?.distance ??
        Infinity;
      const minDistance =
        distanceTable.find((entry) => entry.node === min)?.distance ?? Infinity;
      return nodeDistance < minDistance ? node : min;
    }, unvisitedNodes[0]);

    const neighbors = getNeighbors(minNode);
    const neighborDetails = formatNeighborDetails(neighbors, selectedLanguage);

    speakText(selectedLanguage, "stepDetails", {
      currentIteration: currentIteration + 1,
      minNode,
      neighborDetails,
    });

    const updatedDistanceTable = distanceTable.map((entry) => {
      const neighbor = neighbors.find(
        (neighbor) => neighbor.node === entry.node
      );
      if (neighbor) {
        const currentDistance =
          distanceTable.find((row) => row.node === minNode)?.distance ??
          Infinity;
        const newDistance = currentDistance + neighbor.weight;
        if (newDistance < entry.distance) {
          return {
            ...entry,
            distance: newDistance,
            previous: minNode,
          };
        }
      }
      return entry;
    });

    setVisitedNodes([...visitedNodes, minNode]);
    setUnvisitedNodes(unvisitedNodes.filter((node) => node !== minNode));
    setDistanceTable(updatedDistanceTable);
    setCurrentIteration((prev) => prev + 1);
    setHighlightedNodes([minNode, ...neighbors.map((n) => n.node)]);
  };

  const handlePreviousIteration = () => {
    if (currentIteration <= 0) {
      speakText(selectedLanguage, "alreadyAtFirstStep");
      return;
    }

    // Get the last visited node and revert visited/unvisited nodes
    const lastVisitedNode = visitedNodes[visitedNodes.length - 1];
    const updatedVisitedNodes = visitedNodes.slice(0, -1);
    const updatedUnvisitedNodes = [lastVisitedNode, ...unvisitedNodes];

    // Revert the distance table
    const revertedDistanceTable = distanceTable.map((entry) => {
      if (entry.previous === lastVisitedNode) {
        return { ...entry, distance: Infinity, previous: "" };
      }
      return entry;
    });

    // Determine the previous node
    const previousNode =
      updatedVisitedNodes.length > 0
        ? updatedVisitedNodes[updatedVisitedNodes.length - 1]
        : null;

    // Get neighbors of the previous node
    const neighbors = previousNode ? getNeighbors(previousNode) : [];

    // Prepare narration details
    const narration = previousNode
      ? {
          currentIteration: currentIteration - 1,
          previousNode,
          neighborDetails: formatNeighborDetails(neighbors, selectedLanguage),
        }
      : null;

    // Speak narration
    speakText(
      selectedLanguage,
      narration ? "revertingStep" : "simulationComplete",
      narration || {}
    );

    // Update state
    setVisitedNodes(updatedVisitedNodes);
    setUnvisitedNodes(updatedUnvisitedNodes);
    setDistanceTable(revertedDistanceTable);
    setCurrentIteration((prev) => prev - 1);
    setHighlightedNodes(
      previousNode ? [previousNode, ...neighbors.map((n) => n.node)] : []
    );
  };

  const handleFinishClick = async () => {
    setSimulationStarted(false);
    setSimulationCompleted(false);
    setStartingNodeConfirmed(false);
    setStartNode("");
    speakText("simulationComplete");
    setHighlightedNodes([]);
    setVisitedNodes([]);
    setUnvisitedNodes(["A", "B", "C", "D", "E", "F"]);
    setDistanceTable(initialTable);
    setCurrentNode([]);
    setCurrentIteration(0);
    setNarrationState({ text: "", voice: "" });
    try {
      const response = await axios.patch("/api/user-tracking/simulation", {
        algorithmName: "Dijkstra's Algorithm",
      });
      if (response.status === 200) {
        toast.success("Dijkstra's completed!");
      }
    } catch (error) {
      console.error("Error marking simulation as complete:", error);
      alert("Failed to mark simulation as complete. Please try again.");
    }
  };
  const getNeighbors = (node) => {
    const edges = {
      A: [
        { node: "B", weight: 5 },
        { node: "C", weight: 3 },
      ],
      B: [
        { node: "D", weight: 4 },
        { node: "A", weight: 5 },
      ],
      C: [
        { node: "A", weight: 3 },
        { node: "D", weight: 6 },
        { node: "E", weight: 7 },
      ],
      D: [
        { node: "F", weight: 2 },
        { node: "C", weight: 6 },
        { node: "B", weight: 4 },
      ],
      E: [
        { node: "F", weight: 1 },
        { node: "C", weight: 7 },
      ],
      F: [
        { node: "D", weight: 2 },
        { node: "E", weight: 1 },
      ],
    };
    return edges[node] || [];
  };

  return (
    <div className="p-6 bg-black text-orange-500 min-h-[70vh] flex flex-col justify-center items-center">
      <div className="flex w-full">
        <div className="rounded-lg bg-black w-2/3 h-96 flex items-center justify-center mb-8 relative">
          <div className="absolute top-0 left-0 p-4 bg-gray-800 text-white rounded max-w-[180px]">
            <h3 className="text-lg font-bold mb-2">Voice Assistance</h3>
            <p>{narrationState.text || "No narration yet."}</p>
            <label htmlFor="language" className="block mt-2">
              Select Language:
            </label>
            <select
              id="language"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="mt-1 block w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ka">Kannada</option>
              <option value="te">Telugu</option>
              <option value="ta">Tamil</option>
              <option value="ml">Malayalam</option>
              <option value="de">German</option>
            </select>
          </div>

          {graphSvg || (
            // Default example graph
            <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
              {/* Edges with Weights */}
              <line
                x1="50"
                y1="50"
                x2="200"
                y2="50"
                stroke={
                  highlightedNodes.includes("A") &&
                  highlightedNodes.includes("B")
                    ? "red"
                    : "orange"
                }
                strokeWidth="2"
              />
              <text
                x="125"
                y="40"
                fill="orange"
                fontSize="14"
                fontWeight="bold"
              >
                5
              </text>
              <line
                x1="50"
                y1="50"
                x2="125"
                y2="200"
                stroke={
                  highlightedNodes.includes("A") &&
                  highlightedNodes.includes("C")
                    ? "red"
                    : "orange"
                }
                strokeWidth="2"
              />
              <text
                x="70"
                y="130"
                fill="orange"
                fontSize="14"
                fontWeight="bold"
              >
                3
              </text>
              <line
                x1="200"
                y1="50"
                x2="300"
                y2="150"
                stroke={
                  highlightedNodes.includes("D") &&
                  highlightedNodes.includes("B")
                    ? "red"
                    : "orange"
                }
                strokeWidth="2"
              />
              <text
                x="250"
                y="80"
                fill="orange"
                fontSize="14"
                fontWeight="bold"
              >
                4
              </text>
              <line
                x1="125"
                y1="200"
                x2="300"
                y2="150"
                stroke={
                  highlightedNodes.includes("C") &&
                  highlightedNodes.includes("D")
                    ? "red"
                    : "orange"
                }
                strokeWidth="2"
              />
              <text
                x="210"
                y="170"
                fill="orange"
                fontSize="14"
                fontWeight="bold"
              >
                6
              </text>
              <line
                x1="125"
                y1="200"
                x2="200"
                y2="300"
                stroke={
                  highlightedNodes.includes("C") &&
                  highlightedNodes.includes("E")
                    ? "red"
                    : "orange"
                }
                strokeWidth="2"
              />
              <text
                x="145"
                y="260"
                fill="orange"
                fontSize="14"
                fontWeight="bold"
              >
                7
              </text>
              <line
                x1="300"
                y1="150"
                x2="350"
                y2="300"
                stroke={
                  highlightedNodes.includes("D") &&
                  highlightedNodes.includes("F")
                    ? "red"
                    : "orange"
                }
                strokeWidth="2"
              />
              <text
                x="330"
                y="220"
                fill="orange"
                fontSize="14"
                fontWeight="bold"
              >
                2
              </text>
              <line
                x1="200"
                y1="300"
                x2="350"
                y2="300"
                stroke={
                  highlightedNodes.includes("E") &&
                  highlightedNodes.includes("F")
                    ? "red"
                    : "orange"
                }
                strokeWidth="2"
              />
              <text
                x="275"
                y="320"
                fill="orange"
                fontSize="14"
                fontWeight="bold"
              >
                1
              </text>

              {["A", "B", "C", "D", "E", "F"].map((node, index) => (
                <circle
                  key={node}
                  cx={[50, 200, 125, 300, 200, 350][index]}
                  cy={[50, 50, 200, 150, 300, 300][index]}
                  r="15"
                  fill={
                    !simulationCompleted
                      ? node == currentNode[0]
                        ? "white"
                        : visitedNodes.includes(node)
                        ? "red"
                        : "orange"
                      : "orange"
                  }
                />
              ))}

              {/* Node Labels */}
              <text x="45" y="55" fill="black" fontSize="12" fontWeight="bold">
                A
              </text>
              <text x="195" y="55" fill="black" fontSize="12" fontWeight="bold">
                B
              </text>
              <text
                x="120"
                y="205"
                fill="black"
                fontSize="12"
                fontWeight="bold"
              >
                C
              </text>
              <text
                x="295"
                y="155"
                fill="black"
                fontSize="12"
                fontWeight="bold"
              >
                D
              </text>
              <text
                x="195"
                y="305"
                fill="black"
                fontSize="12"
                fontWeight="bold"
              >
                E
              </text>
              <text
                x="345"
                y="305"
                fill="black"
                fontSize="12"
                fontWeight="bold"
              >
                F
              </text>
            </svg>
          )}
        </div>
        {simulationStarted && startingNodeConfirmed && (
          <div className="ml-8 text-sm">
            {/* <h3 className="text-lg font-bold mb-2">Simulation Status</h3> */}
            <div className="ml-8 text-sm">
              <h3 className="text-lg font-bold mb-2">Simulation Status</h3>
              <div className="mb-4">
                <strong>Visited Nodes:</strong>
                <div className="p-2 border border-orange-500 rounded-lg bg-black text-white">
                  {visitedNodes.length > 0 ? visitedNodes.join(", ") : "None"}
                </div>
              </div>
              <div className="mb-4">
                <strong>Unvisited Nodes:</strong>
                <div className="p-2 border border-orange-500 rounded-lg bg-black text-white">
                  {unvisitedNodes.join(", ")}
                </div>
              </div>
              <table className="table-auto border-collapse border border-orange-500 text-white">
                <thead>
                  <tr>
                    <th className="border border-orange-500 px-4 py-2">Node</th>
                    <th className="border border-orange-500 px-4 py-2">
                      Shortest Distance
                    </th>
                    <th className="border border-orange-500 px-4 py-2">
                      Previous Node
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {distanceTable.map((row) => (
                    <tr key={row.node}>
                      <td className="border border-orange-500 px-4 py-2">
                        {row.node}
                      </td>
                      <td className="border border-orange-500 px-4 py-2">
                        {row.distance === Infinity ? "∞" : row.distance}
                      </td>
                      <td className="border border-orange-500 px-4 py-2">
                        {row.previous || "None"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div>
        {!simulationStarted && !simulationCompleted && (
          <div className="flex space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-black transition duration-300"
            >
              Edit Graph
            </button>
            <button
              onClick={handleStartClick}
              className="px-6 py-3 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-black transition duration-300"
            >
              Start
            </button>
          </div>
        )}

        {simulationStarted && !startingNodeConfirmed && (
          <div className="flex flex-col items-center w-full max-w-xl">
            <input
              type="text"
              placeholder="Enter Starting Node (e.g., A)"
              value={startNode}
              onChange={(e) => setStartNode(e.target.value.toUpperCase())}
              className="px-4 py-2 border border-orange-500 rounded-lg text-black w-1/2 mb-4"
            />
            <button
              onClick={handleConfirmStartingNode}
              className="px-6 py-3 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-black transition duration-300"
            >
              Confirm Starting Node
            </button>
          </div>
        )}

        {simulationStarted && startingNodeConfirmed && !simulationCompleted && (
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handlePreviousIteration}
              className="px-6 py-3 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-black transition duration-300"
            >
              Previous
            </button>
            <button
              onClick={
                currentIteration === totalIterations
                  ? handleFinishClick
                  : handleNextIteration
              }
              className="px-6 py-3 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-black transition duration-300"
            >
              {currentIteration === totalIterations ? "Finish" : "Next"}
            </button>
          </div>
        )}

        {isModalOpen && (
          <SimulationSection
            onClose={() => setIsModalOpen(false)}
            setGraphSvg={(newGraph) => {
              setGraphSvg(newGraph);
              setIsCustomGraph(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DijkstraSimulation;
