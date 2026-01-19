import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  browsePets,
  createPost,
  deletePost,
  reportPost,
  reportUser,
  requestAdoption,
  showOwnPost,
  updatePost,
} from "../controller/UserActionsController.js";
import { petPostValidation } from "../validation/PetPostValidation.js";
import multer from "multer";
import { verifiedUser } from "../middleware/VerifiedUser.js";
import { reportValidation } from "../validation/ReportValidation.js";

const userActionRouter = Router();

const uploader = multer({
  storage: multer.diskStorage({ destination: "/pet_images" }),
  limits: 5 * 1024 * 1024,
});

userActionRouter.post(
  "/create-post",
  verifyToken,
  verifiedUser,
  uploader.array("files", 10),
  petPostValidation,
  createPost
);
userActionRouter.post(
  "/update-post/:postId",
  verifyToken,
  verifiedUser,
  uploader.array("files", 10),
  petPostValidation,
  updatePost
);
userActionRouter.get(
  "/delete-post/:postId",
  verifyToken,
  verifiedUser,
  deletePost
);
userActionRouter.get("/show-own-post/", verifyToken, verifiedUser, showOwnPost);

userActionRouter.get("/browse-pets", verifyToken, verifiedUser, browsePets);
userActionRouter.get(
  "/request-adoption/:postId",
  verifyToken,
  verifiedUser,
  requestAdoption
);

userActionRouter.post(
  "/report-post/",
  verifyToken,
  verifiedUser,
  reportValidation,
  reportPost
);

userActionRouter.post(
  "/report-user/",
  verifyToken,
  verifiedUser,
  reportValidation,
  reportUser
);

export default userActionRouter;
