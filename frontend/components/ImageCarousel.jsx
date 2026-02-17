import { alkatra } from "@/app/font";
import Image from "next/image";
import { useState, useEffect } from "react";

const ImageCarousel = ({ storyDetails }) => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeImage = (newIndex) => {
    if (isTransitioning) return; // Prevent rapid clicking

    setIsTransitioning(true);
    setTimeout(() => {
      setIndex(newIndex);
      setIsTransitioning(false);
    }, 150); // Half of the transition duration
  };

  // Auto-play functionality using useEffect
  useEffect(() => {
    if (storyDetails.length <= 1) return; // Don't auto-play if only one image

    const interval = setInterval(() => {
      if (!isTransitioning) {
        const newIndex = index === storyDetails.length - 1 ? 0 : index + 1;
        changeImage(newIndex);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [index, storyDetails.length, isTransitioning]);

  return (
    <div
      className={`flex flex-wrap justify-between items-center gap-2 relative rounded-2xl w-full min-h-[60vh] mx-auto pl-6`}
    >
      {/* Current Image */}
      <div
        className={`relative w-96 order-1 aspect-square -rotate-5 overflow-hidden rounded-lg`}
      >
        <Image
          src={storyDetails[index].imageUrl}
          alt={`Image ${index + 1}`}
          width={1000}
          height={1000}
          className={`w-full aspect-square object-cover transition-opacity duration-300 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      <div className="details transition-all duration-300 ease-in-out">
        <h2 className={`${alkatra.className} text-2xl text-secondary`}>
          {storyDetails[index].title}
        </h2>
        <p className="text-gray-600">{storyDetails[index].story}</p>
      </div>

      {/* Navigation buttons - only show if more than 1 image */}
      {/* {storyDetails.length > 1 && (
        <>
          <div className="absolute w-full h-2 left-1/2 -translate-x-1/2 bottom-3 flex justify-center items-center gap-2">
            {storyDetails.map((_, idx) => (
              <button
                key={idx}
                className={`w-8 h-2 rounded-full shadow transition-all duration-300 cursor-pointer ${
                  idx === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                onClick={() => changeImage(idx)}
                disabled={isTransitioning}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )} */}
    </div>
  );
};

export default ImageCarousel;
