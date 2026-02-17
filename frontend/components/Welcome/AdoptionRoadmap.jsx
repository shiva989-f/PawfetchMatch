import { alkatra, corinthia } from "@/app/font";
import Image from "next/image";
import React from "react";

const AdoptionRoadmap = () => {
  const roadmapSteps = [
    {
      number: "01",
      title: "Create an Account",
      description:
        "Create your account using email or social login to get started quickly and securely on the app.",
      bgColor: "blue-200",
      animalImage: "/step_1.png",
      iconImage: "/parrot-icon.png",
      iconBg: "bg-blue-600",
    },
    {
      number: "02",
      title: "Complete Profile",
      description:
        "Fill in basic details and preferences so the app can personalize features according to your needs.",
      bgColor: "pink-200",
      animalImage: "/step_2.png",
      iconImage: "/hamster-icon.png",
      iconBg: "bg-red-600",
    },
    {
      number: "03",
      title: "Explore Dashboard",
      description:
        "Navigate through the dashboard to understand tools, features, and options designed to simplify your experience.",
      bgColor: "green-200",
      animalImage: "/step_3.png",
      iconImage: "/black-cat-icon.png",
      iconBg: "bg-green-800",
    },
    {
      number: "04",
      title: "Use Core Features",
      description:
        "Start using the main features of the app to perform tasks efficiently and achieve your goals faster.",
      bgColor: "pink-300",
      animalImage: "/step_4.png",
      iconImage: "/dog-icon.png",
      iconBg: "bg-pink-700",
    },
    {
      number: "05",
      title: "Track Progress",
      description:
        "Monitor your activity, progress, and results in real time to stay motivated and improve consistently.",
      bgColor: "green-300",
      animalImage: "/step_5.png",
      iconImage: "/husky-icon.png",
      iconBg: "bg-green-700",
    },
    {
      number: "06",
      title: "Get Support",
      description:
        "Access help guides, FAQs, or customer support whenever you need assistance or face any issues.",
      bgColor: "cyan-300",
      animalImage: "/step_6.png",
      iconImage: "/poodle-icon.png",
      iconBg: "bg-cyan-600",
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
          <p>One small decision can change a pet’s entire world</p>
        </div>
      </div>

      {/* Roadmap Grid */}
      <div className="relative w-full mx-auto mt-16">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {roadmapSteps.map((step, index) => (
            <div key={index} className="relative" style={{ zIndex: 1 }}>
              {/* Card */}
              <div
                className={`bg-${step.bgColor} rounded-2xl p-6 pb-8 relative overflow-visible shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                {/* Peeking Animal */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32">
                  <Image
                    src={step.animalImage}
                    alt=""
                    width={128}
                    height={128}
                    className="object-contain"
                  />
                </div>

                {/* Inner Card */}
                <div className={`bg-white rounded-2xl p-6 mt-16 relative`}>
                  {/* Icon */}
                  <div
                    className={`absolute -top-6 -right-6 ${step.iconBg} rounded-full p-3 w-16 h-16 flex items-center justify-center shadow-lg`}
                  >
                    <Image
                      src={step.iconImage}
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>

                  {/* Content */}
                  <h2
                    className={`text-6xl font-bold text-${step.bgColor} opacity-50 ${alkatra.className} mb-2`}
                  >
                    {step.number}
                  </h2>
                  <h3 className="text-xl font-bold mb-3 underline decoration-2">
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
