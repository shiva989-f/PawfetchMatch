import { uploadFile } from "../cloudinary/cloudinary.config.js";
import { ChatModel } from "../model/ChatModel.js";
import { Message } from "../model/MessageModel.js";
import fs from "fs";

// To Create new chat http://localhost:5000/api/chat/create-chat
export const createChat = async (req, res) => {
  try {
    const { userId1, userId2 } = req.body;
    if (!userId1 || !userId2) {
      return res.status(400).json({ message: "Bad Request!", success: false });
    }

    // Prevent self chat
    if (userId1 === userId2) {
      return res.status(400).json({
        message: "You cannot create a chat with yourself",
        success: false,
      });
    }

    const members = [userId1, userId2].sort();
    const existingChat = await ChatModel.findOne({
      members: members,
    });

    // If chat already exist
    if (existingChat)
      return res.status(200).json({
        message: "Chat already exist!",
        chat: existingChat,
        success: true,
      });

    // else
    const chat = await ChatModel.create({
      members: members,
    });
    res
      .status(200)
      .json({ message: "Chat created successfully!", chat, success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

// To fetch all chats of the user http://localhost:5000/api/chat/chat-lists
export const chatList = async (req, res) => {
  try {
    const userId = req.userData._id;

    if (!userId) {
      return res.status(400).json({
        message: "Bad request!",
        success: false,
      });
    }

    const chats = await ChatModel.find({
      members: { $in: [userId] },
    })
      .populate("members", "username profilePicUrl") // get user info
      .sort({ updatedAt: -1 });

    // Remove current user from members
    const formattedChats = chats.map((chat) => {
      const otherUser = chat.members.find(
        (member) => member._id.toString() !== userId.toString(),
      );

      return {
        _id: chat._id,
        user: otherUser,
        lastMessage: chat.lastMessage,
        updatedAt: chat.updatedAt,
      };
    });

    res.status(200).json({
      message: "All chats fetched!",
      chats: formattedChats,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

// To send a message http://localhost:5000/api/chat/chat-lists
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userData._id;
    const { chatId, text } = req.body;

    if (!chatId) {
      return res.status(400).json({
        message: "Chat ID is required",
        success: false,
      });
    }

    const chat = await ChatModel.findById(chatId);

    // To check if sender is a part of the chat member
    if (!chat.members.includes(senderId)) {
      return res.status(403).json({
        message: "Unauthorized",
        success: false,
      });
    }

    // Upload images to cloudinary
    const images = [];
    if (req.files) {
      for (const file of req.files) {
        const upload = await uploadFile(file.path);
        images.push({
          picId: upload.public_id,
          picURL: upload.secure_url,
        });
        fs.unlinkSync(file.path);
      }
    }

    // Prevent empty message
    if (!text && images.length === 0) {
      return res.status(400).json({
        message: "Message cannot be empty",
        success: false,
      });
    }

    const newMessage = await Message.create({
      chatId,
      senderId,
      text,
      images,
    });

    // Update chat last message
    await ChatModel.findByIdAndUpdate(chatId, {
      lastMessage: text || "📷 Image",
      updatedAt: new Date(),
    });

    res.status(200).json({
      message: "Message sent successfully",
      data: newMessage,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

// To fetch all the messages of the chat http://localhost:5000/api/chat/messages/:chatId
export const messages = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).json({
        message: "Chat ID is required",
        success: false,
      });
    }

    const messages = await Message.find({ chatId })
      .populate("senderId", "username profilePicUrl")
      .sort({ createdAt: 1 });

    res.status(200).json({
      message: "All messages fetched!",
      messages,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

// To fetch all the latest messages of the chat http://localhost:5000/api/chat/messages/:chatId?lastTime=timestamp",
export const getLatestMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { lastTime } = req.query;

    console.log(lastTime);

    const messages = await Message.find({
      chatId,
      createdAt: { $gt: new Date(lastTime) },
    }).sort({ createdAt: 1 });

    res.status(200).json({ messages, success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// To mark messages as seen of the chat http://localhost:5000/api/chat/messages/seen/:chatId
export const markAsSeen = async (req, res) => {
  try {
    const userId = req.userData._id;
    const { chatId } = req.params;

    await Message.updateMany(
      {
        chatId,
        senderId: { $ne: userId }, // Mark as seen other's messages
        status: { $ne: "seen" },
      },
      { $set: { status: "seen" } },
    );

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
