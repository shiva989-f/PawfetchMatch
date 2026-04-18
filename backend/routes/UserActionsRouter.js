import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  browsePosts,
  chatbot,
  createPost,
  deletePost,
  getAllNotification,
  getNotification,
  postDetails,
  reportPost,
  reportUser,
  requestAdoption,
  searchPost,
  showReports,
  showUserPost,
  updatePost,
} from "../controller/UserActionsController.js";
import { petPostValidation } from "../validation/PetPostValidation.js";
import multer from "multer";
import { verifiedUser } from "../middleware/VerifiedUser.js";
import { reportValidation } from "../validation/ReportValidation.js";

const userActionRouter = Router();

const uploader = multer({
  storage: multer.diskStorage({}),
  limits: 5 * 1024 * 1024,
});

userActionRouter.post(
  "/create-post",
  verifyToken,
  verifiedUser,
  uploader.array("files", 10),
  petPostValidation,
  createPost,
);
userActionRouter.post(
  "/update-post/:postId",
  verifyToken,
  verifiedUser,
  uploader.array("files", 10),
  petPostValidation,
  updatePost,
);
userActionRouter.get(
  "/delete-post/:postId",
  verifyToken,
  verifiedUser,
  deletePost,
);
userActionRouter.get(
  "/show-user-post/",
  verifyToken,
  verifiedUser,
  showUserPost,
);
userActionRouter.get("/pets", verifyToken, verifiedUser, browsePosts);
userActionRouter.get("/pet/:id", verifyToken, verifiedUser, postDetails);
userActionRouter.get(
  "/request-adoption/:postId",
  verifyToken,
  verifiedUser,
  requestAdoption,
);
userActionRouter.post(
  "/report-post/",
  verifyToken,
  verifiedUser,
  reportValidation,
  reportPost,
);
userActionRouter.post(
  "/report-user/",
  verifyToken,
  verifiedUser,
  reportValidation,
  reportUser,
);
userActionRouter.get("/search-post", verifyToken, verifiedUser, searchPost);
userActionRouter.get(
  "/notifications/:receiverId",
  verifyToken,
  verifiedUser,
  getAllNotification,
);

userActionRouter.get(
  "/notification/:notificationId",
  verifyToken,
  verifiedUser,
  getNotification,
);
userActionRouter.get("/show-reports", verifyToken, verifiedUser, showReports);
userActionRouter.post("/chatbot", verifyToken, verifiedUser, chatbot);

export default userActionRouter;
