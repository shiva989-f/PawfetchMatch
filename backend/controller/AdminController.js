import { PetPostModel } from "../model/PetPostModel.js";
import { ReportModel } from "../model/ReportModel.js";

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

export const reportedPostsAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalPosts = await ReportModel.countDocuments();
    const posts = await ReportModel.find()
      .populate("targetId") // populate targetId with specific fields from PetPost
      .populate("reporterId", "username email") // populate reporterId with name and email fields
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

export const showAllUsersAdmin = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};
