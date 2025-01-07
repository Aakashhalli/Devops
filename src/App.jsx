import { Routes, Route, useParams, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Learn from "./pages/Learn.jsx";
import AlgorithmPage from "./pages/AlgorithmPage.jsx";
import Signup from "./components/Signup.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Logout from "./components/Logout.jsx";
import { Toaster } from "react-hot-toast";
const AlgorithmWrapper = () => {
  const { algorithm } = useParams(); // Get the algorithm name from the route
  return <AlgorithmPage algorithmName={algorithm} />;
};

const App = () => {
  const location = useLocation(); // Hook to get current route path
  const hideHeaderAndFooterForSignup = location.pathname === "/signup";
  const hideHeaderAndFooterForLogin = location.pathname === "/login";

  return (
    <div className="flex flex-col min-h-screen bg-black text-orange-500">
      {!hideHeaderAndFooterForSignup && !hideHeaderAndFooterForLogin && (
        <Header />
      )}

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/learn/dijkstra"
            element={<AlgorithmPage algorithmName="Dijkstra's Algorithm" />}
          />
          <Route
            path="/learn/prims"
            element={<AlgorithmPage algorithmName="Prim's Algorithm" />}
          />
          <Route
            path="/learn/kruskal"
            element={<AlgorithmPage algorithmName="Kruskal's Algorithm" />}
          />
          <Route
            path="/learn/bellman-ford"
            element={<AlgorithmPage algorithmName="Bellman-Ford Algorithm" />}
          />
          <Route
            path="/learn/floyd-warshall"
            element={<AlgorithmPage algorithmName="Floyd-Warshall Algorithm" />}
          />
          <Route path="/learn/:algorithm" element={<AlgorithmWrapper />} />
        </Routes>
      </main>
      {!hideHeaderAndFooterForSignup && !hideHeaderAndFooterForLogin && (
        <Footer />
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={10} // Slightly increase gutter for more space between toasts
        containerClassName="toast-container"
        containerStyle={{
          zIndex: 9999, // Ensure the toasts are always on top
          padding: "20px", // Extra padding for the container
        }}
        toastOptions={{
          // Define default options
          className: "default-toast",
          duration: 5000,
          style: {
            background: "#363636", // Dark background for neutral messages
            color: "#fff",
            padding: "15px 20px", // More padding for better readability
            borderRadius: "8px", // Rounded corners for a modern look
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // Soft shadow for depth
            fontFamily: "Arial, sans-serif", // Better font
            fontSize: "14px", // Slightly larger text
            maxWidth: "320px", // Max width for readability
            transition: "transform 0.3s ease-out, opacity 0.3s ease", // Smooth fade-in/fade-out
            opacity: 1,
          },

          // Default options for specific types
          success: {
            duration: 4000,
            style: {
              background: "green", // Green background for success
              color: "#fff",
              boxShadow: "0 2px 10px rgba(0, 128, 0, 0.2)", // Green shadow for success
            },
            theme: {
              primary: "green", // Green primary color
              secondary: "white", // White secondary text
            },
          },

          error: {
            duration: 5000,
            style: {
              background: "#e74c3c", // Red background for error
              color: "#fff",
              boxShadow: "0 2px 10px rgba(231, 76, 60, 0.3)", // Red shadow for error
            },
            theme: {
              primary: "#e74c3c", // Red primary color
              secondary: "white", // White secondary text
            },
          },

          loading: {
            duration: 3000,
            style: {
              background: "#f39c12", // Yellow background for loading state
              color: "#fff",
            },
          },

          // Add more types as needed (info, warning, etc.)
        }}
      />
    </div>
  );
};

export default App;
// Placeholder components for each route
// const Home = () => <div className="p-6">Welcome to the Home Page!</div>;
// const Home = () => <Home />
// const Learn = () => (
//   <div className="p-6">Learn about graph algorithms here.</div>
// );
// const AboutUs = () => <div className="p-6">About Us content goes here.</div>;
// const ContactUs = () => (
//   <div className="p-6">Contact Us content goes here.</div>
// );
