import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PetPost",
    },

    type: {
      type: String,
      enum: ["adoption_request", "report", "message"],
      required: true,
    },

    message: {
      type: String,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const NotificationModel = mongoose.model(
  "Notification",
  notificationSchema,
);
