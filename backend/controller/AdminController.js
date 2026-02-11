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
export const changeReportStatus = async (req, res) => {
  try {
    const { reportId, reportStatus } = req.body;
    const allowedStatus = ["pending", "in review", "resolved", "rejecting"];
    if (!allowedStatus.includes(reportStatus)) {
      return res
        .status(400)
        .json({ message: "Not acceptable status", success: false });
    }

    if (!reportId || !reportStatus) {
      return res.status(400).json({
        message: "Report ID and status are required!",
        success: false,
      });
    }
    const report = await ReportModel.findById(reportId);
    if (!report) {
      return res
        .status(404)
        .json({ message: "Report not found!", success: false });
    }

    report.status = reportStatus;
    await report.save();
    res
      .status(200)
      .json({ message: "Report status changed successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong!", error, success: false });
  }
};

// Manage Post
export const managePost = async (req, res) => {
  try {
    const { postId, postStatus } = req.body;
    const allowedStatus = ["visible", "deleted"];
    if (!postId || !postStatus) {
      return res.status(400).json({
        message: "Post ID and status are required!",
        success: false,
      });
    }

    if (!allowedStatus.includes(postStatus)) {
      return res
        .status(400)
        .json({ message: "Not acceptable status", success: false });
    }

    const post = await PetPostModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found!", success: false });
    }

    post.postStatus = postStatus;
    await post.save();
    res
      .status(200)
      .json({ message: "Post status changed successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong!", error, success: false });
  }
};

// Manage User
export const manageUser = async (req, res) => {
  try {
    const { userId, accountStatus } = req.body;
    const allowedStatus = ["active", "suspended", "deleted"];
    if (!userId || !accountStatus) {
      return res.status(400).json({
        message: "User ID and status are required!",
        success: false,
      });
    }

    if (!allowedStatus.includes(accountStatus)) {
      return res
        .status(400)
        .json({ message: "Not acceptable status", success: false });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    }

    if (accountStatus === "deleted") {
      // If account is deleted then delete all posts of the user and mark all reports against the user as resolved
      await PetPostModel.updateMany({ userId }, { postStatus: "deleted" });
      await ReportModel.updateMany(
        { targetId: userId, targetType: "User" },
        { status: "resolved" },
      );
    }

    user.accountStatus = accountStatus;
    await user.save();
    res
      .status(200)
      .json({ message: "User status changed successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong!", error, success: false });
  }
};
