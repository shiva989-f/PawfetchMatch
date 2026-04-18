import { Router } from "express";
import { verifiedUser } from "../middleware/VerifiedUser.js";
import {
  chatList,
  createChat,
  getLatestMessages,
  markAsSeen,
  messages,
  sendMessage,
} from "../controller/ChattingController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import multer from "multer";

const uploader = multer({
  storage: multer.diskStorage({}),
  limits: 5 * 1024 * 1024,
});

const chatRouter = Router();

chatRouter.post("/create-chat", verifyToken, verifiedUser, createChat);
chatRouter.get("/chat-lists/", verifyToken, verifiedUser, chatList);
chatRouter.post(
  "/send-message/",
  verifyToken,
  verifiedUser,
  uploader.array("files", 10),
  sendMessage,
);
chatRouter.get("/messages/:chatId", verifyToken, verifiedUser, messages);

// Call api frontend like this messages/:chatId?lastTime=timestamp
chatRouter.get(
  "messages/:chatId",
  verifyToken,
  verifiedUser,
  getLatestMessages,
);
chatRouter.get("/messages/seen/:chatId", verifyToken, verifiedUser, markAsSeen);

export default chatRouter;
