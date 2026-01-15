import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  browsePets,
  createPost,
  requestAdoption,
  updatePost,
} from "../controller/UserActionsController.js";
import { petPostValidation } from "../validation/PetPostValidation.js";
import multer from "multer";
import { verifiedUser } from "../middleware/VerifiedUser.js";

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
userActionRouter.get(
  "/update-post/:postId",
  verifyToken,
  verifiedUser,
  uploader.array("files", 10),
  petPostValidation,
  updatePost
);
userActionRouter.get("/browse-pets", verifyToken, verifiedUser, browsePets);
userActionRouter.post(
  "/request-adoption",
  verifyToken,
  verifiedUser,
  requestAdoption
);

export default userActionRouter;
