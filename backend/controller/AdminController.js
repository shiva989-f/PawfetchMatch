import { PetPostModel } from "../model/PetPostModel.js";
import { ReportModel } from "../model/ReportModel.js";
import { User } from "../model/UserModel.js";

// API to show all posts for admin with pagination
export const showAllPostsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalPosts = await PetPostModel.countDocuments();
    const posts = await PetPostModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      message: "Post fetched successfully!",
      totalPosts,
      totalPage: Math.ceil(totalPosts / limit),
      posts,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

// Show all users to admin API
export const showAllUsersAdmin = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res
      .status(200)
      .json({ message: "Users fetched successfully!", users, success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

// Show all reported posts
export const reportedPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalPosts = await ReportModel.countDocuments({
      targetType: "PetPost",
    });
    const posts = await ReportModel.find({ targetType: "PetPost" })
      .populate("targetId") // populate targetId with specific fields from PetPost
      .populate("reporterId", "username email") // populate reporterId with name and email fields
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      message: "Reported Post fetched successfully!",
      totalPosts,
      totalPage: Math.ceil(totalPosts / limit),
      posts,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

// Show all reported users API
export const reportedUsers = async (req, res) => {
  try {
    const users = await ReportModel.find({ targetType: "User" })
      .populate("targetId") // populate targetId with specific fields from PetPost
      .populate("reporterId", "username email"); // populate reporterId with name and email fields

    res.status(200).json({
      message: "Reported Users fetched successfully!",
      users,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

// Change report status
export const changeReportStatus = async (req, res) => {};
