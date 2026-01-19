import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { User } from "../model/UserModel.js";
import { createOtp } from "../utils/CreateOTP.js";
import {
  sendResetPasswordMail,
  sendResetPasswordSuccessMail,
  sendVerificationMail,
  sendWelcomeEmail,
} from "../nodemailer/EmailSender.js";
import { uploadFile } from "../cloudinary/cloudinary.config.js";
import fs from "fs";
import { createJwtSaveInCookies } from "../utils/CreateJwtSaveCookie.js";

// Signup functionality so we do not have to repeat in signup and adminSignup
const signupData = async (req, res) => {
  const { email, password } = req.body;
  // find user, hash the password create verification token, save the data
  const hashedPassword = await bcryptjs.hash(password, 10);
  const OTP = createOtp();
  const existingUser = await User.findOne({ email });
  // Checking if user already exist
  if (existingUser) {
    if (existingUser.isVerified) {
      return res.status(409).json({
        message: "User already exist with this email, Please login!",
        success: true,
      });
    } else {
      // If user not exist send verification mail
      existingUser.verificationToken = OTP;
      existingUser.verificationTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // Valid for 1 hour
      await existingUser.save();
      sendVerificationMail(email, OTP);
      res.status(200).json({
        message: "Otp sent on email for verification!",
        success: true,
      });
    }
  }

  // If user not exist then upload user image in cloudinary
  // If file not exist
  if (!req.file) {
    return res.status(404).json({
      message: "Profile picture is required!",
      file: req.file,
      success: false,
    });
  }

  // upload image in cloudinary if exist
  const upload = await uploadFile(req.file.path);
  fs.unlinkSync(req.file.path); // Delete file after upload

  if (!upload) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", success: false });
  }
  return { hashedPassword, upload, OTP };
};

// Admin signup Function http://localhost:3000/api/auth/admin-signup
export const adminSignup = async (req, res) => {
  try {
    const { hashedPassword, upload, OTP } = await signupData(req, res);

    // Create new user and save in DB.
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      role: "admin",
      profilePicId: upload.public_id,
      profilePicUrl: upload.secure_url,
      verificationToken: OTP,
      verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000,
    });

    await newUser.save();

    // Send verification mail
    sendVerificationMail(req.body.email, OTP);
    res
      .status(201)
      .json({ message: "Account created successfully!", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message, // Return readable message
      success: false,
    });
  }
};

// Signup Function http://localhost:3000/api/auth/signup
export const signup = async (req, res) => {
  try {
    const { hashedPassword, upload, OTP } = await signupData(req, res);
    // Create new user and save in DB.
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      profilePicId: upload.public_id,
      profilePicUrl: upload.secure_url,
      verificationToken: OTP,
      verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000,
    });

    await newUser.save();

    // Send verification mail
    sendVerificationMail(req.body.email, OTP);
    res
      .status(201)
      .json({ message: "Account created successfully!", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message, // Return readable message
      success: false,
    });
  }
};

// Verify Email API http://localhost:3000/api/auth/verify-email
export const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res
        .status(400)
        .json({ message: "Please enter valid OTP!", success: false });
    }
    // Check if otp exist and it is not expired
    const user = await User.findOne({
      verificationToken: otp,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid OTP, try with correct OTP!",
        success: false,
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    // Send welcome email and save jwt token in cookie
    sendWelcomeEmail(user.email, user.username);
    createJwtSaveInCookies(res, user.id);

    res.status(200).json({
      message: "User verified successfully!",
      user: { ...user._doc, password: undefined },
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      success: false,
    });
  }
};

// Login API http://localhost:3000/api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Email or Password is not valid!", success: false });
    }

    // Find user with this email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email not found, Please login!", success: false });
    }

    // check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({
        message: "Email is not verified, Please sign up!",
        success: false,
      });
    }
    // Else match password
    const matchedPassword = await bcryptjs.compare(password, user.password);
    if (!matchedPassword) {
      return res
        .status(400)
        .json({ message: "Password is not correct!", success: false });
    }
    // if password is correct
    createJwtSaveInCookies(res, user.id, user.role);
    res.status(202).json({
      message: "User logged in successfully!",
      user: { ...user._doc, password: undefined },
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      success: false,
    });
  }
};

//  Logout API http://localhost:3000/api/auth/logout
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out!", success: true });
};

// Forgot Password API http://localhost:3000/api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Invalid request, please enter email!",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found, check your email!", success: false });
    } else {
      if (!user.isVerified) {
        return res.status(404).json({
          message: "User is not verified please signup!",
          success: false,
        });
      }
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    await user.save();
    sendResetPasswordMail(
      email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({
      message: "We've send you reset link on your email!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      success: false,
    });
  }
};

// Reset Password API http://localhost:3000/api/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;
    if (!resetToken || !password) {
      return res.status(400).json({
        message: "Bad Request",
        success: false,
      });
    }

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    sendResetPasswordSuccessMail(user.email, user.username);
    res
      .status(200)
      .json({ message: "Password reset successfully!", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      success: false,
    });
  }
};

// Check Auth API http://localhost:3000/api/auth/check-auth
export const checkAuth = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found, Please Login!", success: false });
    }
    res
      .status(200)
      .json({ message: "User found successfully!", user, success: true });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
      success: false,
    });
  }
};
