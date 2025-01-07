import PropTypes from "prop-types";

const Popup = ({ isOpen, onClose, requirements }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <span className="text-2xl">&times;</span>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Certificate Requirements
        </h2>
        <ul className="list-disc list-inside text-gray-800 space-y-2">
          {requirements.map((req, index) => (
            <li key={index} className="text-sm sm:text-base">
              {req}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  requirements: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Popup;
