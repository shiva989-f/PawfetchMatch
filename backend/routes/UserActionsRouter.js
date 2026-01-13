import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createPost } from "../controller/UserActionsController.js";
import { petPostValidation } from "../validation/PetPostValidation.js";

const userActionRouter = Router();

userActionRouter.post(
  "/create-post",
  verifyToken,
  petPostValidation,
  createPost
);

export default userActionRouter;
