import { alkatra } from "@/app/font";
import React from "react";
import Card from "./Card";
import ImageCarousel from "../ImageCarousel";

const Story = () => {
  const storyDetails = [
    {
      imageUrl: "/slide_img_1.jpeg",
      title: "Sheru's Journey to a Forever Home",
      story: `Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. `,
      bgColor: "bg-purple-800",
    },
    {
      imageUrl: "/slide_img_2.jpeg",
      title: "Pinku's Journey to a Forever Home",
      story: `Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. `,
      bgColor: "bg-purple-800",
    },
    {
      imageUrl: "/slide_img_3.jpeg",
      title: "Tapu's Journey to a Forever Home",
      story: `Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. `,
      bgColor: "bg-purple-800",
    },
    {
      imageUrl: "/slide_img_4.jpeg",
      title: "Sonu's Journey to a Forever Home",
      story: `Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. Left alone on a quiet street, a small dog waited for an owner who
      never returned. Hungry and scared, he slowly lost hope. A kind
      stranger posted his photo on Pawfect. One evening, a woman saw his
      eyes and felt an instant bond. She adopted him, giving him love,
      warmth, and a forever home. `,
      bgColor: "bg-purple-800",
    },
  ];
  return (
    <section>
      <h1
        className={`text-4xl md:text-5xl font-bold ${alkatra.className} mt-20`}
      >
        Adoption Is an Act of <span className="text-secondary">Love.</span>
      </h1>
      <h3 className={`${alkatra.className} text-xl md:text-2xl mt-2 underline`}>
        Because Every Life{" "}
        <span className="underline decoration-secondary text-secondary">
          Matters.
        </span>
      </h3>
      <div className="card-container">
        <ImageCarousel storyDetails={storyDetails} />
      </div>
    </section>
  );
};

export default Story;
