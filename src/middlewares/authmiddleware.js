import jwt from "jsonwebtoken";
import userModel from "../DB/models/User.model.js";




export const protectRoute = async (req, res, next) => {
  if (!req.headers.token) {
    return res.status(401).json({ message: "You must login first" });
  }

  const decoded = jwt.verify(req.headers.token, process.env.TOKEN_SECRETKEY);

  const user = await userModel.findById(decoded.id)
  if (!user) {
    return res.status(404).json({message: "user not found"})
  }

  next()
  console.log(decoded)
};
