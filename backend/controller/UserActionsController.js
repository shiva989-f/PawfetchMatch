import multer from "multer";
import { deleteImage, uploadFile } from "../cloudinary/cloudinary.config.js";
import { PetPostModel } from "../model/PetPostModel.js";
import fs from "fs";
import { Report } from "../model/ReportModel.js";
import { User } from "../model/UserModel.js";

// Create post
export const createPost = async (req, res) => {
  try {
    // Upload images to cloudinary
    const uploadedImages = [];
    if (req.files) {
      for (const file of req.files) {
        const upload = await uploadFile(file.path);
        uploadedImages.push({
          picId: upload.public_id,
          picURL: upload.secure_url,
        });
        await fs.promises.unlink(file.path);
      }
    }

    // Create pet post
    await PetPostModel.create({
      ...req.body,
      images: uploadedImages,
    });

    res.status(201).json({ message: "Post uploaded!", success: true });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "File size limit exceeded", success: false });
    }
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const userId = req.userData._id.toString();
    const postId = req.params.postId;
    if (!postId)
      return res.status(400).json({ message: "Bad request", success: false });

    // check if post exist
    const post = await PetPostModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post doesn't exist!", success: false });
    }

    if (post.userId.toString() !== userId)
      return res
        .status(403)
        .json({ message: "Unauthorized user!", success: false });

    // Delete all existing image
    if (req.files && req.files.length > 0) {
      for (const image of post.images) {
        await deleteImage(image.picId);
      }
    }

    // Upload new images to cloudinary
    const uploadedImages = [];
    for (const file of req.files) {
      const upload = await uploadFile(file.path);
      uploadedImages.push({
        picId: upload.public_id,
        picURL: upload.secure_url,
      });
      await fs.promises.unlink(file.path);
    }

    // Update existing post
    post.images = uploadedImages;
    Object.assign(post, req.body);
    await post.save();

    res.status(200).json({ message: "Post updated!", success: true });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "File size limit exceeded", success: false });
    }
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const userId = req.userData._id.toString();
    const postId = req.params.postId;

    if (!postId)
      return res.status(400).json({ message: "Bad request", success: false });

    const post = await PetPostModel.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post doesn't exist!", success: false });

    if (post.userId.toString() !== userId)
      return res
        .status(401)
        .json({ message: "Unauthorized user!", success: false });

    for (const image of post.images) {
      await deleteImage(image.picId);
    }
    await post.deleteOne();

    res.status(200).json({ message: "Post deleted!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

// Show own post
export const showOwnPost = async (req, res) => {
  const userId = req.userData._id.toString();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const posts = await PetPostModel.find({ userId })
    .populate({ path: "requests", select: "username" }) // populate user id stored in requests and select only username from User model, ref given in PetPostModel request array
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();
  if (!posts)
    return res.status(404).json({ message: "No Post!", success: false });

  res.status(200).json({ message: "All posts fetched!", posts, success: true });
};

// Browse all posts
export const browsePets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalPosts = await PetPostModel.countDocuments();
    const posts = await PetPostModel.find()
      .skip(skip) // how much records is to skip
      .limit(limit) // Maximum Number of records
      .sort({ createdAt: -1 }) // Without sort mongodDB will return data in unpredictable order. 1 is ascending order (old to new). -1 is descending order new to old
      .lean(); // returns plain javascript object instead of mongoose documents

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

// Request for adoption
export const requestAdoption = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.userData._id.toString();
    if (!postId)
      return res.status(400).json({ message: "Bad request", success: false });

    const post = await PetPostModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post doesn't exist!", success: false });
    }
    // If user requesting for own post
    if (post.userId.toString() === userId) {
      return res
        .status(400)
        .json({ message: "Cannot request your own post", success: false });
    }

    // Find post and add user in requests
    await post.updateOne({ $addToSet: { requests: userId } });

    res.status(200).json({ message: "Requested...", success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

// Report Post API
export const reportPost = async (req, res) => {
  try {
    const { targetId, reason, description } = req.body;
    const userId = req.userData._id.toString();
    const target = await PetPostModel.findById(targetId);
    if (!target)
      return res
        .status(404)
        .json({ message: "Post is unavailable.", success: false });

    await Report.create({
      targetType: "PetPost",
      targetId,
      reporterId: userId,
      reason,
      description,
      status: "pending",
    });
    res.status(200).json({ message: "Post reported success!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

// Report User API
export const reportUser = async (req, res) => {
  try {
    const { targetId, reason, description } = req.body;
    const userId = req.userData._id.toString();
    const target = await User.findById(targetId);
    if (!target)
      return res
        .status(404)
        .json({ message: "User is not available.", success: false });

    await Report.create({
      targetType: "User",
      targetId,
      reporterId: userId,
      reason,
      description,
      status: "pending",
    });
    res.status(200).json({ message: "User reported success!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};
