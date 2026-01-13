import mongoose from "mongoose";

const petPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  animalType: {
    type: String,
    required: true,
  },
  animalBreed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    required: true,
  },
  healthCondition: {
    type: String,
    required: true,
  },
  vaccinationStatus: {
    type: String,
    required: true,
  },
  sterilizationStatus: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      picId: String,
      picURL: String,
    },
  ],
  adoptionStatus: {
    type: String,
  },
  requests: [{ type: mongoose.Schema.Types.ObjectId }],
  dateOfListing: {
    type: Date,
    default: Date.now,
  },
});

export const PetPostModel = mongoose.model("PetPost", petPostSchema);
