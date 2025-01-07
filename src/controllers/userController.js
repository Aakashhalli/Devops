import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import USER from "../model/user.js";
import UserTracking from "../model/userTracking.js";
import bcrypt from "bcrypt";
import arcjet, { validateEmail } from "@arcjet/node";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const JWT_SECRET_KEY = process.env.VITE_JWT_SECRET;
const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.VITE_EMAIL_USER,
    pass: process.env.VITE_EMAIL_PASSWORD,
  },
});

const aj = arcjet({
  key: process.env.VITE_ARCJET_KEY,
  rules: [
    validateEmail({
      mode: "LIVE",
      block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),
  ],
});

cloudinary.config({
  cloud_name: "dzvjajjij",
  api_key: "137311864225163",
  api_secret: process.env.VITE_CLOUDINARY_KEY,
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const decision = await aj.protect(req, { email });
    console.log("Arcjet decision:", JSON.stringify(decision, null, 2));

    if (decision.isDenied()) {
      const reason = decision.results?.[0]?.reason?.emailTypes || [];
      console.log(reason);

      return res.status(403).json({
        error: "Signup denied by Arcjet",
        reason,
      });
    }
    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const otp = generateOTP();
    otpStore[email] = otp;

    await transporter.sendMail({
      from: process.env.VITE_EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `
                <html>
                  <head>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                      }
                      .email-container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                      }
                      .email-header {
                        text-align: center;
                        padding: 20px;
                        border-bottom: 2px solid #eeeeee;
                      }
                      .email-header img {
                        max-width: 120px;
                        margin-bottom: 10px;
                      }
                      .email-header h1 {
                        font-size: 22px;
                        color: #333333;
                        margin: 0;
                      }
                      .email-body {
                        font-size: 16px;
                        color: #555555;
                        line-height: 1.6;
                        padding: 20px 0;
                      }
                      .otp-container {
                        text-align: center;
                        margin: 20px 0;
                      }
                      .otp-code {
                        display: inline-block;
                        font-size: 24px;
                        font-weight: bold;
                        color: #ffffff;
                        background-color: #4CAF50;
                        padding: 10px 20px;
                        border-radius: 5px;
                      }
                      .email-footer {
                        font-size: 14px;
                        text-align: center;
                        color: #888888;
                        margin-top: 20px;
                        border-top: 2px solid #eeeeee;
                        padding-top: 10px;
                      }
                      .email-footer a {
                        color: #4CAF50;
                        text-decoration: none;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="email-container">
                      <!-- Header with logo -->
                      <div class="email-header">
                        <img src="cid:logo" alt="Project Logo" />
                        <h1>Verify with AlgoVisual</h1>
                      </div>
    
                      <!-- Email body -->
                      <div class="email-body">
                        <p>Hi ${firstname},</p>
                        <p>Thank you for registering with us! Please use the code below to verify your email:</p>
                        <div class="otp-container">
                          <div class="otp-code">${otp}</div>
                        </div>
                        <p>If you did not request this, please ignore this email.</p>
                      </div>
    
                      <!-- Footer -->
                      <div class="email-footer">
                        <p>Regards,<br />Team AlgoVisual</p>
                        <p>
                          Need help? <a href="akashhalli2468@gmail.com">Contact us</a>
                        </p>
                      </div>
                    </div>
                  </body>
                </html>
              `,
      attachments: [
        {
          filename: "V-Photoroom.png", // Name of your logo file
          path: "C:/Users/akash/OneDrive/Desktop/AVA - Copy/public/V-Photoroom.png", // Update this path to the actual path of the logo
          cid: "logo", // Content ID for inline attachment
        },
      ],
    });

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp, firstname, lastname, password, profileImage } = req.body;

  if (!otp || !email || !firstname || !lastname || !password || !profileImage) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (otpStore[email] !== otp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new USER({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profileImageUrl: profileImage, // Correct field name
    });

    await newUser.save();

    // Create a UserTracking document for the new user
    const newUserTracking = new UserTracking({
      userId: newUser._id,
      algorithms: {
        Dijkstras: {
          isSimulationCompleted: false,
          isTheoryCompleted: false,
          quizMarks: 0,
        },
        FloydWarshall: {
          isSimulationCompleted: false,
          isTheoryCompleted: false,
          quizMarks: 0,
        },
        BellmanFord: {
          isSimulationCompleted: false,
          isTheoryCompleted: false,
          quizMarks: 0,
        },
      },
    });

    await newUserTracking.save();
    delete otpStore[email]; // Clear OTP after successful signup
    res.json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error during user creation:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log(email);

  try {
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token);

    res.status(200).json({
      message: "Login successful",
      role: user.role,
      token: token,
      name: user.firstname,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    // console.log("API /api/profile");

    res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      profileImage: user.profileImageUrl,
      isCertified: user.isCertified,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { firstname, lastname, dob, gender, profileImage } = req.body;
    const user = req.user;

    // Update user details
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;

    // Update profile image URL if provided
    if (profileImage) {
      user.profileImageUrl = profileImage; // Assign the new URL
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = (req, res) => {
  try {
    console.log("API /api/logout");

    res.clearCookie("token", {
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Error while logging out:", error);
    res.status(500).json({ message: "Error while logging out." });
  }
};

export {
  registerUser,
  verifyOtp,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
};
