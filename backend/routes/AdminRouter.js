import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/VerifyAdmin.js";
import { showAllPostsAdmin } from "../controller/AdminController.js ";
import {
  reportedPosts,
  reportedUsers,
  showAllUsersAdmin,
} from "../controller/AdminController.js";

const adminRouter = Router();

adminRouter.get("/show-all-posts", verifyToken, verifyAdmin, showAllPostsAdmin);
adminRouter.get("/show-all-users", verifyToken, verifyAdmin, showAllUsersAdmin);
adminRouter.get("/reported-posts", verifyToken, verifyAdmin, reportedPosts);

adminRouter.get("/reported-users", verifyToken, verifyAdmin, reportedUsers);

export default adminRouter;
