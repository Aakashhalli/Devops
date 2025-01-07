import USER from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const isAuth = async (req, res, next) => {
  const cookie = req.cookies;
  const { token } = cookie;

  if (!token) {
    return res.status(400).send("Please log in");
  }

  const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
  const { id } = decoded;

  const user = await USER.findOne({ _id: id });

  if (!user) {
    return res.status(400).send("User not Found or user not authorised");
  }
  req.user = user;
  next();
};

export default isAuth;
