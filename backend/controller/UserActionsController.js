import { uploadFile } from "../cloudinary/cloudinary.config.js";
import { PetPostModel } from "../model/PetPostModel.js";
import { User } from "../model/UserModel.js";
import fs from "fs";

export const createPost = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user?.isVerified)
      return res
        .status(404)
        .json({ message: "User is not authorized, Login!", success: false });

    // Upload images to cloudinary
    const uploadedImages = [];
    if (req.files) {
      for (const file of req.files) {
        const upload = await uploadFile(file.path);
        uploadedImages.push({
          picId: upload.public_id,
          picURL: upload.secure_url,
        });
        fs.unlinkSync(file.path);
      }
    }

    // Create pet post
    const petPost = await PetPostModel.create({
      ...req.body,
      images: uploadedImages,
    });
    await petPost.save();
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

export const browsePets = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user?.isVerified) {
      return res
        .status(404)
        .json({ message: "User is not authorized, Login!", success: false });
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalPosts = await PetPostModel.countDocuments();
    const posts = await PetPostModel.find()
      .skip(skip) // how much records is to skip
      .limit(limit) // Maximum Number of records
      .sort({ createdAt: -1 }); // Without sort mongodDB will return data in unpredictable order. 1 is ascending order (old to new). -1 is descending order new to old

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
