import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
// DB connection import
import "./DB/DBConn.js";
import authRouter from "./routes/AuthRouter.js";
import userActionRouter from "./routes/UserActionsRouter.js";
import adminRouter from "./routes/AdminRouter.js";
import chatRouter from "./routes/ChatRouter.js";

// Env Variables
const PORT = process.env.PORT;

const app = express();
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Routers
app.use("/api/auth", authRouter);
app.use("/api/user", userActionRouter);
app.use("/api/admin", adminRouter);

app.use("/api/chat", chatRouter);

app.listen(PORT, () => {
  console.log(`Running on port on ${PORT}`);
});
