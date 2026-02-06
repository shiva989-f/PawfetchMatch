import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
// DB connection import
import "./DB/DBConn.js";
import authRouter from "./routes/AuthRouter.js";
import userActionRouter from "./routes/UserActionsRouter.js";
import adminRouter from "./routes/AdminRouter.js";

// Env Variables
const PORT = process.env.PORT;

const app = express();
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Routers
app.use("/api/auth", authRouter);
app.use("/api/user", userActionRouter);
app.use("/api/admin", adminRouter);

io.on("connection", (socket) => {
  console.log("User ID: ", socket.id);
  // Emitting a welcome message to the connected client using custom welcome socket event
  socket.emit("welcome", `Welcome to our app ${socket.id}`);
});

server.listen(PORT, () => {
  console.log(`Running on port on ${PORT}`);
});
