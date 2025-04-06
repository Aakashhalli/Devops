import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          "https://algovisual-8uc4.onrender.com/api/users/profile"
        );
        setProfileImage(response.data.profileImage);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-md  shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link className="text-2xl font-bold flex items-center" to="/">
          <img
            src="./V-Photoroom.png"
            alt="logo"
            className="w-10 h-10 mr-2 rounded-full border-2 border-orange-500 bg-white"
          />
          <span className="text-orange-500 hover:text-white transition-colors">
            AlgoVisual
          </span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <NavButton label="Home" to="/" />
          <NavButton label="Learn" to="/learn" />
          <NavButton label="About Us" to="/about" />
          <NavButton label="Contact Us" to="/contact" />
          {profileImage ? (
            <button
              onClick={() => navigate("/profile")}
              className="rounded-full overflow-hidden w-10 h-10 border-2 border-orange-500 hover:shadow-orange-500 hover:shadow-md transition-shadow"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <NavButton label="Profile" to="/profile" />
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-orange-500 focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden bg-black/70 backdrop-blur-md text-orange-500">
          <NavButtonMobile label="Home" to="/" />
          <NavButtonMobile label="Learn" to="/learn" />
          <NavButtonMobile label="About Us" to="/about" />
          <NavButtonMobile label="Contact Us" to="/contact" />
          {profileImage ? (
            <button
              onClick={() => navigate("/profile")}
              className="block rounded-full overflow-hidden w-10 h-10 border-2 border-orange-500 mx-auto mt-2"
            >
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <NavButtonMobile label="Profile" to="/profile" />
          )}
        </div>
      )}
    </header>
  );
};

const NavButton = ({ label, to }) => (
  <Link
    to={to}
    className="relative px-4 py-2 rounded-lg text-[17px] font-semibold group hover:bg-orange-500 hover:text-black transition-colors"
  >
    <span className="absolute inset-0 bg-orange-500 opacity-0 rounded-lg group-hover:opacity-20 transition-opacity"></span>
    <span className="relative">{label}</span>
  </Link>
);

const NavButtonMobile = ({ label, to }) => (
  <Link
    to={to}
    className="block px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-500 hover:text-black transition-transform"
  >
    {label}
  </Link>
);

NavButton.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
NavButtonMobile.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default Header;
