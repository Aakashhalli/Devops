import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { motion } from "framer-motion";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://algovisual-8uc4.onrender.com/api/users/profile`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setIsLogin(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {isLogin && (
        <motion.div
          className="min-h-screen flex flex-col bg-black text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <motion.header
            className="text-center pt-12 text-4xl font-bold"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Welcome {userDetails.firstname}
          </motion.header>

          {/* Hero Section */}
          <motion.div
            className="flex-grow flex flex-row items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col justify-center mr-28">
              <motion.h1
                className="text-6xl font-extrabold text-orange-500"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Virtual Laboratory
              </motion.h1>
              <motion.h1
                className="text-4xl font-extrabold mb-10 text-orange-500"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                for Slow Learners
              </motion.h1>
              <div className="flex flex-wrap justify-center">
                <motion.div
                  className="w-[650px] p-6 bg-gray-800 rounded-lg shadow-lg"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">
                    About our project
                  </h2>
                  <p className="text-[17px] leading-relaxed text-justify">
                    With this project, we aim to simplify the learning process
                    for complex graph algorithms in Data Structures and
                    Algorithms by providing clear visualizations and interactive
                    algorithm simulations. Our goal is to make these concepts
                    accessible to all types of learners, enhancing their
                    understanding and confidence.
                  </p>
                </motion.div>
              </div>
              <div>
                <motion.div
                  className="relative inline-flex group mt-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {/* Gradient Background with Effects */}
                  <div className="absolute transition-all duration-1000 opacity-55 -inset-px bg-gradient-to-r from-[#fbff7a] via-[#ffa844] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-70 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

                  {/* Actual Button */}
                  <Link
                    to="/learn"
                    className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-black bg-orange-500 rounded-lg hover:bg-white hover:border-white hover:scale-105 transition-transform border-2 border-orange-500"
                  >
                    Start Learning
                  </Link>
                </motion.div>
              </div>
            </div>
            {/* Right Section */}
            <motion.div
              className="w-[300px] h-[300px]  flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img src="./S.png" alt="Placeholder" className="rounded-lg" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Home;
