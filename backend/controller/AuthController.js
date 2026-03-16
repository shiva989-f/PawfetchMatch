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
const signupData = async (req) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email }).select("-password");

  // If user already exists
  if (existingUser) {
    if (existingUser.isVerified) {
      return { user: existingUser, status: "ALREADY_VERIFIED" };
    }
    const OTP = createOtp();
    existingUser.verificationToken = OTP;
    existingUser.verificationTokenExpiresAt = Date.now() + 60 * 60 * 1000;
    await existingUser.save();
    sendVerificationMail(email, OTP);
    return { user: existingUser, status: "OTP_SENT" };
  }

  // New user flow
  if (!req.file) {
    throw new Error("Profile picture is required!");
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const OTP = createOtp();
  const upload = await uploadFile(req.file.path);
  fs.unlinkSync(req.file.path);
  if (!upload) {
    throw new Error("Image upload failed");
  }
  return {
    status: "NEW_USER",
    hashedPassword,
    upload,
    OTP,
  };
};

// Admin signup Function http://localhost:3000/api/auth/admin/signup
export const adminSignup = async (req, res) => {
  try {
    const result = await signupData(req);
    if (result.status === "ALREADY_VERIFIED") {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please login!",
        user: result.user,
      });
    }
    if (result.status === "OTP_SENT") {
      return res.status(200).json({
        success: true,
        message: "Verification code is sent on email!",
        user: result.user,
      });
    }
    const { hashedPassword, upload, OTP } = result;
    const user = await User.create({
      ...req.body,
      role: "admin",
      password: hashedPassword,
      profilePicId: upload.public_id,
      profilePicUrl: upload.secure_url,
      verificationToken: OTP,
      verificationTokenExpiresAt: Date.now() + 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Verification code is sent on email!",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Signup Function http://localhost:3000/api/auth/signup
export const signup = async (req, res) => {
  try {
    const result = await signupData(req);

    if (result.status === "ALREADY_VERIFIED") {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please login!",
        user: result.user,
      });
    }
    if (result.status === "OTP_SENT") {
      return res.status(200).json({
        success: true,
        message: "Verification code is sent on email!",
        user: result.user,
      });
    }
    const { hashedPassword, upload, OTP } = result;
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      profilePicId: upload.public_id,
      profilePicUrl: upload.secure_url,
      verificationToken: OTP,
      verificationTokenExpiresAt: Date.now() + 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      message: "Verification code is sent on email!",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
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
    if (user.accountStatus === "deleted") {
      return res.status(403).json({
        message: "Account is deleted, You can't login!",
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
    console.log(email);
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
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    );
    res.status(200).json({
      message: "We've send you reset link on your email!",
      success: true,
    });
  } catch (error) {
    console.log(error);
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

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
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
        .json({ message: "User not found with this token!", success: false });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    sendResetPasswordSuccessMail(user.email, user.username);
    createJwtSaveInCookies(res, user.id, user.role);
    res.status(200).json({
      message: "Password reset successfully!",
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
