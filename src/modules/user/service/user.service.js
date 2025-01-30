import jwt from "jsonwebtoken";
import userModel from "../../../DB/models/User.model.js";

export const updateUser =  async(req, res) => {
  
  
  try {
    const { token } = req.headers;
    console.log(token);

    const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
    console.log(decoded);

    const updatedUser = await userModel.findByIdAndUpdate(decoded.id, {userName:req.body.userName}, {new: true})
    
    res.status(200).json({ message: "Welcome", updatedUser});
  } catch (error) {}
};



export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      file: req.file,
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
