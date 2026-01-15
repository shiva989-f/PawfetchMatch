import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { browsePets, createPost } from "../controller/UserActionsController.js";
import { petPostValidation } from "../validation/PetPostValidation.js";
import multer from "multer";

const userActionRouter = Router();

const uploader = multer({
  storage: multer.diskStorage({ destination: "/pet_images" }),
  limits: 5 * 1024 * 1024,
});

userActionRouter.post(
  "/create-post",
  verifyToken,
  uploader.array("files", 10),
  petPostValidation,
  createPost
);

userActionRouter.get("/browse-pets", verifyToken, browsePets);

export default userActionRouter;
