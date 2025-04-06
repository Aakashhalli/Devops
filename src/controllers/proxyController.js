import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const generateCertificate = async (req, res) => {
  console.log("/api/generate-certificate called");

  try {
    console.log("Incoming request body:", req.body);

    const response = await axios.post(
      "https://api.certifier.io/v1/credentials/create-issue-send",
      req.body,
      {
        headers: {
          accept: "application/json",
          "Certifier-Version": "2022-10-26",
          "content-type": "application/json",
          authorization: `Bearer ${process.env.VITE_CERTIFIER_ACCESS_TOKEN}`,
        },
      }
    );

    console.log("Response from Certifier API:", response.data);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error from Certifier API:", error.response?.data || error);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Server error" });
  }
};

export default generateCertificate;
