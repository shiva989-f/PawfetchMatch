import { useUserActions } from "@/Store/UserAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsGenderNeuter } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { LuMapPin } from "react-icons/lu";

const SuggestedPets = ({ location, animalBreed, animalType }) => {
  const { isLoading, searchPets, pets } = useUserActions();
  const router = useRouter();

  useEffect(() => {
    searchPets({
      query: location + " " + animalBreed + " " + animalType,
      page: 1,
      limit: 10,
    });
    console.log(pets);
  }, []);
  return (
    <section className="my-20">
      <h2 className="text-4xl font-medium text-center">You might also like</h2>

      {/* Data Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {pets?.map((item) => (
            <div
              key={item._id}
              className="shadow-xl rounded-xl overflow-hidden transition-all duration-500 ease-in-out hover:scale-105"
            >
              {/* Pet Image */}
              <div className="relative w-full h-52">
                <Image
                  src={item.images?.[0]?.picURL}
                  alt={item.animalBreed}
                  fill
                  loading="eager"
                  className="object-cover"
                />
              </div>

              {/* Pet Info */}
              <div className="p-4 space-y-1">
                <h2 className="font-semibold text-lg">{item.animalBreed}</h2>
                <div className="flex justify-start items-center gap-2">
                  <div className="flex justify-start items-center gap-2">
                    <BsGenderNeuter className="text-primary" />
                    <p className="text-sm text-gray-600">{item.gender}</p>
                  </div>
                  {/* <span className="text-gray-600">•</span> */}
                  <div className="flex justify-start items-center gap-2">
                    <CgSandClock className="text-primary" />
                    <p className="text-sm text-gray-600">{item.age} year(s)</p>
                  </div>
                </div>

                <div className="flex justify-start items-center gap-2">
                  <LuMapPin className="text-primary" />
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
              <div className="px-4 pb-4 text-center">
                <button
                  className="primary-btn py-1 w-full"
                  onClick={() => {
                    router.push(`/pet/${item._id}`);
                  }}
                >
                  Adopt Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SuggestedPets;
