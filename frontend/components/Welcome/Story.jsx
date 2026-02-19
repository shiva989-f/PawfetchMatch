import { alkatra } from "@/app/font";
import React from "react";
import Card from "./Card";
import ImageCarousel from "../ImageCarousel";

const Story = () => {
  const storyDetails = [
    {
      imageUrl: "/slide_img_1.jpeg",
      title: "Sheru’s New Beginning in Jaipur",
      story: `Left near a crowded bazaar in Jaipur, a small brown dog waited patiently beside a tea stall. He watched every scooter and auto pass by, hoping his owner would return. Days turned into nights, and Sheru grew weaker. A shopkeeper clicked his photo and uploaded it on Pawfect. One evening, a young couple scrolling through the website felt drawn to his gentle eyes. They brought him home, gave him warm rotis, a soft bed, and a name filled with love. Today, Sheru runs happily on their terrace, finally safe and cared for.`,
      bgColor: "bg-purple-800",
      author: "Shiva Kumar",
    },
    {
      imageUrl: "/slide_img_2.jpeg",
      title: "Moti’s Journey from the Streets of Delhi",
      story: `On a chilly morning in Delhi, Moti was found near a bus stop, shivering and hungry. He had been wandering for days, searching for scraps and shelter. A college student shared his story on Pawfect, hoping someone would notice. A family living nearby saw his photo and felt an instant connection. They visited him the same evening and decided he belonged with them. Now Moti spends his days playing in the courtyard and guarding his new home with pride.`,
      bgColor: "bg-purple-800",
      author: "Pankaj Kumar",
    },
    {
      imageUrl: "/slide_img_3.jpeg",
      title: "Gauri’s Second Chance in Mumbai",
      story: `During heavy monsoon rains in Mumbai, a frightened white kitten hid under a parked car. She had lost her way and was too scared to move. A kind auto driver rescued her and posted her details on Pawfect. A working professional scrolling through the site paused at Gauri’s photo. Something about her innocence felt special. She adopted Gauri and welcomed her into her apartment. Today, Gauri naps by the window, watching the rain safely from inside her forever home.`,
      bgColor: "bg-purple-800",
      author: "Shiva Kumar",
    },
    {
      imageUrl: "/slide_img_4.jpeg",
      title: "Chintu’s Story of Hope in Amritsar",
      story: `Near the peaceful lanes of Amritsar, a small pup sat quietly outside a closed shop. He looked tired but hopeful. A passerby noticed him and uploaded his picture on Pawfect. The next day, a retired uncle searching for companionship saw Chintu’s photo and decided to meet him. That meeting changed everything. Chintu now enjoys morning walks, warm milk, and endless affection. He no longer waits for someone who won’t return. He has found a family that will never let him go.`,
      bgColor: "bg-purple-800",
      author: "Pankaj Kumar",
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
