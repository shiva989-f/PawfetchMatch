import joi from "joi";
import mongoose from "mongoose";

// Custom ObjectId validator
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid target Id");
  }
  return value;
};

export const reportValidation = (req, res, next) => {
  const schema = joi.object({
    targetId: joi.string().required().custom(objectId),
    reason: joi.string().required(),
    description: joi.string().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const message = error?.details[0]?.message || "Fields are not valid";
    return res.status(400).json({ message, error });
  }

  next();
};
