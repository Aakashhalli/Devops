import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces.";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    if (validate()) {
      try {
        const response = await axios.post(
          "https://algovisual-8uc4.onrender.com/api/contact/submit-form",
          formData
        );
        console.log("Form submitted successfully:", response.data);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsModalOpen(true);
      handleFormSubmit();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-900 via-black to-gray-900 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-orange-500 mb-12 text-center">
        Get in Touch
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gradient-to-r from-gray-800 via-gray-900 to-black border border-gray-700 rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-semibold text-orange-400 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border focus:outline-none focus:ring ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-600 focus:ring-orange-500"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2">{errors.name}</p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label
            htmlFor="phone"
            className="block text-lg font-semibold text-orange-400 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border focus:outline-none focus:ring ${
              errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-600 focus:ring-orange-500"
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-semibold text-orange-400 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border focus:outline-none focus:ring ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-600 focus:ring-orange-500"
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-semibold text-orange-400 mb-2"
          >
            Your Query (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring focus:ring-orange-500"
            placeholder="Briefly describe your query"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition-all focus:outline-none focus:ring focus:ring-orange-500"
        >
          Submit
        </button>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-gray-900 border border-orange-500 text-orange-400 p-6 rounded-lg shadow-2xl text-center max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p>
              Your query has been successfully submitted. We’ll get back to you
              soon!
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-6 px-6 py-2 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-400 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
