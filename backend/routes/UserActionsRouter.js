import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  browsePosts,
  createPost,
  deletePost,
  getNotifications,
  postDetails,
  reportPost,
  reportUser,
  requestAdoption,
  searchPost,
  showOwnPost,
  showReports,
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
userActionRouter.get("/show-own-post/", verifyToken, verifiedUser, showOwnPost);

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
  getNotifications,
);
userActionRouter.get("/show-reports", verifyToken, verifiedUser, showReports);

export default userActionRouter;
