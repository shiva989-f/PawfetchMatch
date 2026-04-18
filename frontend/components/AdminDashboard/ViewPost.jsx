"use client";

import LoadingSpinner from "@/components/LoadingScreen";
import { useAdminStore } from "@/Store/AdminStore";
import { useUserActions } from "@/Store/UserAction";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { MdLocationPin, MdReportProblem } from "react-icons/md";

const ViewPost = ({ postId }) => {
  const { getPetData, pet } = useUserActions();
  const { managePostStatus, isLoading } = useAdminStore();
  const [index, setIndex] = useState(0);
  const [postStatus, setPostStatus] = useState("");

  useEffect(() => {
    if (postId) {
      getPetData({ id: postId });
    }
  }, [postId]);

  useEffect(() => {
    if (pet?.postStatus) {
      setPostStatus(pet.postStatus);
    }
  }, [pet]);

  if (!pet) {
    return <LoadingSpinner />;
  }

  const changeImage = (i) => {
    setIndex(i);
  };

  const handleChangeStatus = async () => {
    if (!postStatus) {
      return alert("Please select a status");
    }

    await managePostStatus(postId, postStatus);
  };
  return (
    <main className="px-4 md:px-10 py-6 min-h-screen relative bg-white">
      <section className="flex flex-col lg:flex-row gap-12">
        {/* LEFT SIDE */}
        <div className="sm:w-3/5 mx-auto my-12 xl:my-0 xl:w-1/2 flex flex-col items-center">
          {/* Main Image */}
          <div className="bg-primary/80 p-6 md:p-10 rounded-[30px] shadow-2xl xl:rotate-[-4deg] hover:rotate-0 transition duration-500">
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
          <h2 className="text-4xl font-bold">{pet.animalBreed}</h2>

          {/* Location */}
          <div className="flex items-center text-gray-500 gap-2">
            <MdLocationPin size={18} />
            <span>{pet.location}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-4">
            <span className="px-6 py-2 rounded-full bg-primary/20 text-primary">
              {pet.gender}
            </span>

            <span className="px-6 py-2 rounded-full bg-primary/20 text-primary">
              {pet.age} Years
            </span>

            <span className="px-6 py-2 rounded-full bg-primary/20 text-primary">
              {pet.animalType}
            </span>
          </div>

          {/* Health */}
          <div className="bg-white rounded-2xl border border-[#ede8e0] p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Medical Information
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">
                  {pet.healthCondition}
                </span>
                <span
                  className="text-sm font-medium px-3 py-0.5 rounded-full"
                  style={{ background: "#f5f0e8", color: "#5a4a3a" }}
                >
                  {pet.healthCondition}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">
                  {pet.vaccinationStatus}
                </span>
                <span
                  className="text-sm font-medium px-3 py-0.5 rounded-full"
                  style={{ background: "#f5f0e8", color: "#5a4a3a" }}
                >
                  {pet.vaccinationStatus}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">
                  {pet.sterilizationStatus}
                </span>
                <span
                  className="text-sm font-medium px-3 py-0.5 rounded-full"
                  style={{ background: "#f5f0e8", color: "#5a4a3a" }}
                >
                  {pet.sterilizationStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Description card */}
          <div className="bg-white rounded-2xl border border-[#ede8e0] p-5">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              About
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {pet.description}
            </p>
          </div>
          <select
            name="reason"
            id=""
            value={postStatus}
            onChange={(e) => setPostStatus(e.target.value)}
            className="border border-primary outline-none rounded-md py-2 px-4 w-full"
          >
            <option value="" disabled>
              Select a reason
            </option>
            <option value="visible">Visible</option>
            <option value="deleted">Deleted</option>
          </select>
          <button
            disabled={isLoading}
            className="primary-btn w-full py-3 rounded-full text-lg"
            onClick={handleChangeStatus}
          >
            {isLoading ? (
              <FaCircleNotch className="animate-spin text-lg" />
            ) : (
              "Change Status  "
            )}
          </button>
        </div>
      </section>
    </main>
  );
};

export default ViewPost;
