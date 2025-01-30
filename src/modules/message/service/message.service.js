
import messageModel from "../../../DB/models/message.model.js";
import jwt from "jsonwebtoken"






export const createMessage = async (req, res) => {
  try {
    const { text, receiverId } = req.body;

    const token = req.headers.token
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
    const userId = decoded.id;

    
    if (userId === receiverId) {
      return res.status(400).json({ error: "You cannot send a message to yourself" });
    }

    
    if (!text || !receiverId) {
      return res.status(400).json({ error: "Text and receiverId are required" });
    }

    const message = await messageModel.create({ text, receiverId });
    res.status(201).json({ message: "Message created successfully", data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getMessages = async (req, res) => {
  try {
    
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
    const userId = decoded.id;

    
    const { receiverId } = req.params;

    if (!receiverId || receiverId !== userId) {
      return res.status(403).json({ error: "You must login to show your received messages" });
    }

    const messages = await messageModel.find({ receiverId: userId });

    if (!messages.length) {
      return res.status(404).json({ error: "No messages found" });
    }

    res.status(200).json({ data: messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteMessage = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRETKEY);
    const userId = decoded.id;

    const { messageId } = req.params;
    if (!messageId) {
      return res.status(400).json({ error: "MessageId is required" });
    }

    const message = await messageModel.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.receiverId.toString() !== userId) {

      return res
        .status(403)
        .json({ error: "You can only delete messages sent to you" });
    }

    await messageModel.findByIdAndDelete(messageId);

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
