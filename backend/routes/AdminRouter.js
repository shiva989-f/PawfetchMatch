import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/VerifyAdmin.js";
import { showAllPostsAdmin } from "../controller/AdminController.js ";
import {
  changeReportStatus,
  managePost,
  manageUser,
  reportedPosts,
  reportedUsers,
  showAllUsersAdmin,
} from "../controller/AdminController.js";

const adminRouter = Router();

adminRouter.get("/show-all-posts", verifyToken, verifyAdmin, showAllPostsAdmin);
adminRouter.get("/show-all-users", verifyToken, verifyAdmin, showAllUsersAdmin);
adminRouter.get("/reported-posts", verifyToken, verifyAdmin, reportedPosts);

adminRouter.get("/reported-users", verifyToken, verifyAdmin, reportedUsers);
adminRouter.post(
  "/change-report-status",
  verifyToken,
  verifyAdmin,
  changeReportStatus,
);

adminRouter.post("/manage-post", verifyToken, verifyAdmin, managePost);
adminRouter.post("/manage-user", verifyToken, verifyAdmin, manageUser);

export default adminRouter;
