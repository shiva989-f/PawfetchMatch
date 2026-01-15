import mongoose from "mongoose";
import { PetPostModel } from "./model/PetPostModel.js";

const MONGO_URI = process.env.DB_CONN_URI;

const USER_ID = new mongoose.Types.ObjectId("695ffec4a75b17d211929cc6");

const IMAGES = [
  {
    picId: "l3lz2iv2sptnrokurb0z",
    picURL:
      "https://res.cloudinary.com/djcm8ix2b/image/upload/v1768391429/l3lz2iv2sptnrokurb0z.webp",
  },
  {
    picId: "fyip4ya7cm2rbpgqtkjy",
    picURL:
      "https://res.cloudinary.com/djcm8ix2b/image/upload/v1768391430/fyip4ya7cm2rbpgqtkjy.png",
  },
];

const breeds = [
  "German Shepherd",
  "Labrador Retriever",
  "Golden Retriever",
  "Indie",
  "Pug",
  "Beagle",
];

const locations = [
  "Punjab, Jalandhar, Kishanpura",
  "Punjab, Jalandhar, Model Town",
  "Punjab, Jalandhar, Rama Mandi",
  "Punjab, Jalandhar, Basti Sheikh",
];

const healthConditions = [
  "Healthy",
  "Minor skin infection",
  "Recovering from injury",
];

const vaccinationStatuses = [
  "Fully vaccinated",
  "Partially vaccinated",
  "Not vaccinated",
];

const sterilizationStatuses = ["Sterilized", "Not sterilized"];

const genders = ["Male", "Female"];

const generatePosts = (count = 20) => {
  const posts = [];

  for (let i = 0; i < count; i++) {
    posts.push({
      userId: USER_ID,
      animalType: "Dog",
      animalBreed: breeds[i % breeds.length],
      age: Math.floor(Math.random() * 6) + 1,
      gender: genders[i % genders.length],
      healthCondition: healthConditions[i % healthConditions.length],
      vaccinationStatus: vaccinationStatuses[i % vaccinationStatuses.length],
      sterilizationStatus:
        sterilizationStatuses[i % sterilizationStatuses.length],
      location: locations[i % locations.length],
      description:
        "Rescued dog looking for a safe and loving home. Friendly and well behaved.",
      images: IMAGES,
      requests: [],
      dateOfListing: new Date(
        Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000
      ),
    });
  }

  return posts;
};

export const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const data = generatePosts(30); // 👈 change count here
    await PetPostModel.insertMany(data);

    console.log("Pet posts seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
