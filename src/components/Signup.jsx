import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userData, setUserData] = useState(null);

  async function handleSignup(data) {
    setLoading(true);
    try {
      console.log(data);
      const response = await axios.post(
        "https://algovisual-8uc4.onrender.com/api/users/signup",
        {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
        }
      );
      setIsOtpSent(true);
      setEmail(data.email);
      setUserData(data);
      toast.success(
        "A verification code has been sent to your email, Please verify your email."
      );
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error);
      } else {
        console.error("Error during signup:", error);
        toast.error("Signup failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpVerification() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://avatar.iran.liara.run/username?username=${userData.firstname}+${userData.lastname}`
      );
      const blob = await response.blob();

      // Step 2: Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "Mini-Project-User-Profiles");
      formData.append("cloud_name", "dzvjajjij");

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dzvjajjij/image/upload`,
        formData
      );

      const profileImageUrl = cloudinaryResponse.data.secure_url;

      const verificationResponse = await axios.post(
        "https://algovisual-8uc4.onrender.com/api/users/verify-otp",
        {
          email,
          otp,
          password: userData.password,
          firstname: userData.firstname,
          lastname: userData.lastname,
          profileImage: profileImageUrl, // Pass the correct field
        }
      );

      if (verificationResponse.data.message) {
        toast(verificationResponse.data.message);
        navigate("/login");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification or image upload:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">
          {isOtpSent ? "Verify Your Email" : "Create Your Account"}
        </h2>
        {!isOtpSent ? (
          <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">First Name</label>
              <input
                {...register("firstname", {
                  required: "First Name is required",
                })}
                className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.firstname ? "border border-red-500" : "border-none"
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstname.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Last Name</label>
              <input
                {...register("lastname", { required: "Last Name is required" })}
                className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.lastname ? "border border-red-500" : "border-none"
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastname.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.email ? "border border-red-500" : "border-none"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.password ? "border border-red-500" : "border-none"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              disabled={loading}
              className={`w-full p-3 rounded-lg text-white ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                "Signup"
              )}
            </button>
            <Toaster />
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter the OTP sent to your email"
              />
            </div>
            <button
              onClick={handleOtpVerification}
              disabled={loading}
              className={`w-full p-3 rounded-lg text-white ${
                loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        )}
        <div className="flex justify-center mt-6">
          <p className="text-white mr-2">{`Already have an account?`}</p>
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
