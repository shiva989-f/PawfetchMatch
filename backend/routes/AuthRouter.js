import { Router } from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
} from "../controller/AuthController.js";
import {
  loginValidation,
  signupValidation,
} from "../validation/AuthValidation.js";
import multer from "multer";
import { verifyToken } from "../middleware/verifyToken.js";

const uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
}); // Initialize multer for handling multipart/form-data

const authRouter = Router();

authRouter.post("/signup", uploader.single("file"), signupValidation, signup);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/login", loginValidation, login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.get("/check-auth", verifyToken, checkAuth);
authRouter.get("/logout", logout);

export default authRouter;
