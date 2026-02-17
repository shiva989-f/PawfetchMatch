import Image from "next/image";
import React from "react";

const Card = () => {
  return (
    <div className="card">
      <div className="card-img">
        <Image
          src="/dog1.png"
          alt="Dog Image"
          width={350}
          height={350}
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="card-info">
        <h2 className="text-2xl text-shadow-md font-bold">Sheru</h2>
        <p className="text-gray-600">
          Left alone on a quiet street, a small dog waited for an owner who
          never returned. Hungry and scared, he slowly lost hope. A kind
          stranger posted his photo on Pawfect. One evening, a woman saw his
          eyes and felt an instant bond. She adopted him, giving him love,
          warmth, and a forever home.
        </p>
      </div>
    </div>
  );
};

export default Card;
