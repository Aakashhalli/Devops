import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Popup from "../components/Popup.jsx";
const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    _id: null,
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    gender: "",
    profileImage: "",
    isCertified: false,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // Track saving status
  const [RequirementsPopup, setRequirementsPopup] = useState(false);
  const [requirements, setRequirements] = useState([]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/profile");
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const handleSave = async () => {
    setIsSaving(true); // Start the saving animation

    const updatedData = { ...userDetails };

    // If a new profile image is selected, upload it to Cloudinary first
    if (newProfileImage) {
      const formData = new FormData();
      formData.append("file", newProfileImage);
      formData.append("upload_preset", "Mini-Project-User-Profiles");
      formData.append("cloud_name", "dzvjajjij");

      try {
        const imageResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dzvjajjij/image/upload",
          formData
        );
        updatedData.profileImage = imageResponse.data.url; // Ensure the new URL is set
      } catch (error) {
        console.error("Error uploading profile image:", error);
        setIsSaving(false); // Stop the saving animation if image upload fails
        return; // Stop if image upload fails
      }
    }

    try {
      await axios.post("/api/users/update-profile", updatedData);
      setIsSaving(false); // Stop the saving animation
      setIsEditing(false); // Exit edit mode after save
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsSaving(false); // Stop the saving animation
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);
    }
  };

  const url = "/api/proxy/certificate";
  const currentDate = new Date(Date.now());
  const formattedDate = currentDate.toISOString().split("T")[0];

  const handleGenerateCertificate = async () => {
    try {
      // Fetch user tracking data
      const response = await axios.get(`/api/user-tracking/${userDetails._id}`);
      const trackingData = response.data;

      // Extract algorithm data
      const algorithms = trackingData.algorithms;
      const unmetRequirements = [];

      Object.entries(algorithms).forEach(([algorithm, data]) => {
        if (!data.isSimulationCompleted) {
          unmetRequirements.push(`${algorithm}: Complete the simulation.`);
        }
        if (!data.isTheoryCompleted) {
          unmetRequirements.push(`${algorithm}: Complete the theory section.`);
        }
        if (data.quizMarks < 150) {
          unmetRequirements.push(
            `${algorithm}: Achieve at least 150 quiz marks (current: ${data.quizMarks}).`
          );
        }
      });
      console.log(unmetRequirements);

      // If requirements are not met, display them on the screen
      if (unmetRequirements.length > 0) {
        setRequirements(unmetRequirements);
        setRequirementsPopup(true);
        return;
      }

      // Calculate percentage
      const totalScore = Object.values(algorithms).reduce(
        (acc, algo) => acc + algo.quizMarks,
        0
      );
      const maxScore = 300 * 3; // Each algorithm has a max score of 300, and there are 3 algorithms
      const percentage = ((totalScore / maxScore) * 100).toFixed(2); // Calculate percentage and round to 2 decimal places

      // Proceed to generate the certificate
      const payload = {
        groupId: "01jfvsqs8tq46bqepxjyc4zh2r",
        status: "draft",
        recipient: {
          name: `${userDetails.firstname} ${userDetails.lastname}`,
          email: userDetails.email,
        },
        customAttributes: { "custom.score": percentage },
        issueDate: formattedDate,
      };

      const certResponse = await axios.post(url, payload);

      if (certResponse.data.status === "issued") {
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Error during certificate generation:", err);
      alert(
        "An error occurred while generating the certificate. Please try again."
      );
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-10 bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-orange-400">
        Your Profile
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center bg-gray-800 shadow-lg rounded-xl p-8 max-w-4xl mx-auto">
        {/* Profile Image */}
        <div className="relative mb-6 md:mb-0">
          <img
            src={
              newProfileImage
                ? URL.createObjectURL(newProfileImage)
                : userDetails.profileImage
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 shadow-md"
          />
          {isEditing && (
            <div className="absolute bottom-0 right-0">
              <button
                type="button"
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-400"
                onClick={() => document.getElementById("fileInput").click()}
              >
                Change
              </button>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </div>
          )}
        </div>

        {/* User Information */}
        <div className="flex-1 md:pl-8 space-y-4 w-full">
          {/* Firstname */}
          <div>
            <label className="block text-gray-400 mb-1">First Name</label>
            <input
              type="text"
              value={userDetails.firstname}
              readOnly={!isEditing}
              onChange={(e) =>
                setUserDetails({ ...userDetails, firstname: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg"
            />
          </div>
          {/* Lastname */}
          <div>
            <label className="block text-gray-400 mb-1">Last Name</label>
            <input
              type="text"
              value={userDetails.lastname}
              readOnly={!isEditing}
              onChange={(e) =>
                setUserDetails({ ...userDetails, lastname: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={userDetails.email}
              readOnly
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg"
            />
          </div>
          {/* DOB */}
          <div>
            <label className="block text-gray-400 mb-1">Date of Birth</label>
            <input
              type="date"
              value={userDetails.dob ? userDetails.dob.split("T")[0] : ""}
              readOnly={!isEditing}
              onChange={(e) =>
                setUserDetails({ ...userDetails, dob: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg"
            />
          </div>
          {/* Gender */}
          <div>
            <label className="block text-gray-400 mb-1">Gender</label>
            <select
              value={userDetails.gender}
              disabled={!isEditing}
              onChange={(e) =>
                setUserDetails({ ...userDetails, gender: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-lg"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        {isSaving ? (
          <div className="flex justify-center">
            <div className="animate-spin border-4 border-t-4 border-orange-500 rounded-full w-8 h-8"></div>
          </div>
        ) : (
          <>
            {isEditing ? (
              <button
                type="button"
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-400 min-w-[150px]"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-400 min-w-[150px]"
                onClick={handleEditToggle}
              >
                Edit Profile
              </button>
            )}
          </>
        )}

        <button
          className="bg-orange-500 text-black px-6 py-2 rounded-md hover:bg-orange-400 min-w-[150px]"
          onClick={handleGenerateCertificate}
        >
          Generate Certificate
        </button>
        <Popup
          isOpen={RequirementsPopup}
          onClose={() => setRequirementsPopup(false)}
          requirements={requirements}
        />
      </div>

      {/* Logout Button */}
      <div className="mt-6 text-right">
        <Link to="/logout">
          <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-400">
            Logout
          </button>
        </Link>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <p className="mb-4 text-gray-700">
              Certificate has been sent to your email.
            </p>
            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Go to Gmail
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
