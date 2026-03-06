"use client";

import LoadingSpinner from "@/components/LoadingScreen";
import { useUserActions } from "@/Store/UserAction";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdLocationPin } from "react-icons/md";

const Page = () => {
  const { petData, pet } = useUserActions();
  const params = useParams();
  const { id } = params;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (id) {
      petData({ id });
    }
  }, [id]);

  if (!pet) {
    return <LoadingSpinner />;
  }

  const changeImage = (i) => {
    setIndex(i);
  };

  return (
    <main className="px-4 md:px-10 py-6 min-h-screen bg-gray-50">
      {/* Logo */}
      <h1 className="text-3xl font-black text-center mb-14">
        Pawfect<span className="text-primary">.</span>
      </h1>

      <section className="flex flex-col lg:flex-row gap-12">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          {/* Main Image */}
          <div className="bg-primary p-10 rounded-[30px] shadow-2xl rotate-[-4deg] hover:rotate-0 transition duration-500">
            <Image
              src={pet.images?.[index]?.picURL}
              alt="pet"
              width={12000}
              height={12000}
              className="object-contain rounded-2xl"
            />

            {/* Thumbnails */}
            <div className="flex gap-4 mt-6 justify-center">
              {pet.images?.map((img, i) => (
                <div
                  key={i}
                  onClick={() => changeImage(i)}
                  className={`w-24 h-24 cursor-pointer rounded-xl overflow-hidden border-4 ${
                    index === i ? "border-white" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img.picURL}
                    alt="thumbnail"
                    width={100}
                    height={100}
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
          <h2 className="text-5xl font-bold">{pet.animalBreed}</h2>

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
              {pet.animalBreed}
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
          <button className="primary-btn w-full py-4 rounded-full text-lg">
            Request to adopt
          </button>
        </div>
      </section>
    </main>
  );
};

export default Page;
