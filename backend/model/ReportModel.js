import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    targetType: {
      type: String,
      required: true,
      enum: ["PetPost", "User"],
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "targetType", // refPath is dynamic and take reference of the collection from targetType or any passed value
      required: true,
    },
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // ref is fixed reference to the collection
    reason: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "in_review", "resolved", "rejecting"],
    },
  },
  { timestamps: true }
);

export const Report = mongoose.model("Reports", ReportSchema);
