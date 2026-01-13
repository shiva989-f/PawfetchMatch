import joi from "joi";
import mongoose from "mongoose";

// Custom ObjectId validator
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid MongoDB ObjectId");
  }
  return value;
};

export const petPostValidation = () => {
  const schema = joi.object({
    userId: joi.string().required().custom(objectId),

    animalType: joi.string().trim().required(),

    animalBreed: joi.string().trim().required(),

    age: joi.number().min(0).optional(),

    gender: joi.string().trim().required(),

    healthCondition: joi.string().trim().required(),

    vaccinationStatus: joi.string().trim().required(),

    sterilizationStatus: joi.string().trim().required(),

    location: joi.string().trim().required(),

    description: joi.string().trim().required(),

    images: joi
      .array()
      .items(
        joi.object({
          picId: joi.string().required(),
          picURL: joi.string().uri().required(),
        })
      )
      .optional(),

    adoptionStatus: joi.string().trim().optional(),

    requests: joi.array().items(joi.string().custom(objectId)).optional(),

    dateOfListing: joi.date().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const message = error?.details[0]?.message || "Fields are not valid";
    return res.status(400).json({ message, error });
  }

  next();
};
