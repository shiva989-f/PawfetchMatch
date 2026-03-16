"use client";

import LoadingSpinner from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import ReportPostModal from "@/components/ReportPostModal";
import SuggestedPets from "@/components/SuggestedPets";
import { useAuthStore } from "@/Store/AuthStore";
import { useUserActions } from "@/Store/UserAction";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdLocationPin, MdReportProblem } from "react-icons/md";

const Page = () => {
  const { user } = useAuthStore();
  const { getPetData, pet, requestAdoption } = useUserActions();
  const [isVisible, setIsVisible] = useState(false);
  const params = useParams();
  const { id } = params;

  const router = useRouter();

  const [index, setIndex] = useState(0);

  // Fetch Pet Data
  useEffect(() => {
    if (id) {
      getPetData({ id });
    }
  }, [id]);

  if (!pet) {
    return <LoadingSpinner />;
  }

  const changeImage = (i) => {
    setIndex(i);
  };

  const handleRequestAdoption = async () => {
    const { _id: postId } = pet;
    await requestAdoption({ postId });
  };

  return (
    <main className="px-4 md:px-10 py-6 min-h-screen relative">
      <Navbar />

      <section className="flex flex-col lg:flex-row gap-12">
        {/* LEFT SIDE */}
        <div className="sm:w-3/5 mx-auto my-12 xl:my-0 xl:w-1/2 flex flex-col items-center">
          {/* Main Image */}
          <div className="bg-primary/20 p-6 md:p-10 rounded-[30px] shadow-2xl xl:rotate-[-4deg] hover:rotate-0 transition duration-500">
            <Image
              src={pet.images?.[index]?.picURL}
              alt="pet"
              width={12000}
              height={12000}
              loading="eager"
              className="object-contain rounded-2xl"
            />

            {/* Thumbnails */}
            <div className="flex gap-4 mt-6 justify-center">
              {pet.images?.map((img, i) => (
                <div
                  key={i}
                  onClick={() => changeImage(i)}
                  className={`w-18 h-18 cursor-pointer rounded-xl overflow-hidden border-4 ${
                    index === i ? "border-white" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img.picURL}
                    alt="thumbnail"
                    width={100}
                    height={100}
                    loading="eager"
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 space-y-6">
          {/* Name */}
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold">{pet.animalBreed}</h2>
            <MdReportProblem
              className="w-8 h-8 text-primary"
              onClick={() => setIsVisible((prev) => !prev)}
            />
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-500 gap-2">
            <MdLocationPin size={18} />
            <span>{pet.location}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-4">
            <span className="px-6 py-2 rounded-full bg-secondary/20 text-secondary">
              {pet.gender}
            </span>

            <span className="px-6 py-2 rounded-full bg-secondary/20 text-secondary">
              {pet.age} Years
            </span>

            <span className="px-6 py-2 rounded-full bg-secondary/20 text-secondary">
              {pet.animalType}
            </span>
          </div>

          {/* Health */}
          <div className="border rounded-xl p-5 bg-white">
            <h3 className="text-lg font-semibold mb-2">Medical Information</h3>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">
                  Health Condition
                </span>
                <span className="capitalize">{pet.healthCondition}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-500">
                  Vaccination Status
                </span>
                <span className="capitalize">{pet.vaccinationStatus}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium text-gray-500">
                  Sterilization Status
                </span>
                <span className="capitalize">{pet.sterilizationStatus}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border rounded-xl p-5 bg-white">
            <h3 className="font-semibold text-lg mb-2">Description</h3>

            <p className="text-gray-600 leading-relaxed">{pet.description}</p>
          </div>

          {/* Button */}
          <button
            className="primary-btn w-full py-3 rounded-full text-lg"
            onClick={handleRequestAdoption}
          >
            Request to adopt
          </button>
        </div>
      </section>

      {/* You might also like */}
      <SuggestedPets
        location={pet.location}
        animalBreed={pet.animalBreed}
        animalType={pet.animalType}
      />

      <ReportPostModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </main>
  );
};

export default Page;
