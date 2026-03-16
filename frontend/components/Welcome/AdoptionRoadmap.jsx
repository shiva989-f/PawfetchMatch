import { alkatra, corinthia } from "@/app/font";
import Image from "next/image";
import React from "react";

const AdoptionRoadmap = () => {
  const roadmapSteps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Register using your phone number and verify it with OTP. This ensures every user on Pawfect is real and helps keep the adoption community safe.",
      bgColor: "#CFDEFF",
      animalImage: "/step_1.png",
      iconImage: "/icon_1.png",
      iconBg: "#3269EC",
    },
    {
      number: "02",
      title: "Complete Your Profile",
      description:
        "Add your name, city, and optional profile photo. A complete profile helps pet owners and adopters trust each other during the adoption process.",
      bgColor: "#FECDD0",
      animalImage: "/step_2.png",
      iconImage: "/icon_2.png",
      iconBg: "#E70116",
    },
    {
      number: "03",
      title: "Find a Pet",
      description:
        "Explore pets and rescued animals listed by other users. View details like age, health condition, vaccination status, and location before requesting adoption.",
      bgColor: "#D3FFB1",
      animalImage: "/step_3.png",
      iconImage: "/icon_3.png",
      iconBg: "#86E152",
    },
    {
      number: "04",
      title: "Post an Animal for Adoption",
      description:
        "Found a stray or cannot care for your pet anymore? Capture photos using the in-app camera and post the animal for free adoption so someone can give it a loving home.",
      bgColor: "#FEC1DA",
      animalImage: "/step_4.png",
      iconImage: "/icon_4.png",
      iconBg: "#F34588",
    },
    {
      number: "05",
      title: "Send or Manage Adoption Requests",
      description:
        "Users can request to adopt a pet, while owners can review all requests, see interested adopters, and choose the best home for the animal.",
      bgColor: "#B1FFDC",
      animalImage: "/step_5.png",
      iconImage: "/icon_5.png",
      iconBg: "#44D390",
    },
    {
      number: "06",
      title: "Connect and Complete Adoption",
      description:
        "Chat with the pet owner or adopter, discuss details, and finalize the adoption responsibly. Pawfect only connects people — adoption is always free.",
      bgColor: "#91FFF4",
      animalImage: "/step_6.png",
      iconImage: "/icon_6.png",
      iconBg: "#44A6D3",
    },
  ];

  return (
    <section>
      {/* Header */}
      <div className="header-text">
        <h1 className={`${corinthia.className} text-7xl font-bold`}>Adopt</h1>
        <div className="hidden md:block w-1 h-16 bg-secondary mx-2 shrink-0"></div>
        <div className="header-container">
          <h1
            className={`text-center md:text-start text-5xl ${alkatra.className}`}
          >
            Getting Started Is Easy<span className="text-secondary">.</span>
          </h1>
          <p className="text-center">
            One small decision can change a pet’s entire world
          </p>
        </div>
      </div>

      {/* Roadmap Grid */}
      <div className="relative w-full mx-auto mt-16">
        <div className="absolute inset-0 w-full h-full bg-[url('/grid.png')] bg-repeat opacity-30"></div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {roadmapSteps.map((step, index) => (
            <div
              key={index}
              className="relative bottom-0"
              style={{ zIndex: 1 }}
            >
              {/* Card */}
              <div
                style={{ backgroundColor: step.bgColor }}
                className={`rounded-2xl p-6 pb-8 relative overflow-visible shadow-lg `}
              >
                {/* Inner Card */}
                <div
                  className={`bg-white rounded-2xl p-6 mt-16 relative shadow-lg hover:shadow-xl transition-shadow duration-300`}
                >
                  {/* Icon */}
                  <div
                    style={{ backgroundColor: step.iconBg }}
                    className={`border-3 border-white absolute -top-8 right-5 rounded-full p-1 w-16 h-16 flex items-center justify-center shadow-lg`}
                  >
                    <Image
                      src={step.iconImage}
                      alt=""
                      width={64}
                      height={64}
                      className="w-full rounded-full object-fill"
                    />
                  </div>

                  {/* Content */}
                  <h2
                    style={{ color: step.bgColor }}
                    className={`text-6xl font-bold opacity-50 ${alkatra.className} mb-2`}
                  >
                    {step.number}
                  </h2>
                  <h3 className="text-xl font-semibold mb-3 underline decoration">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdoptionRoadmap;
