import { useEffect } from "react";
import Image from "next/image";
import { useAuthStore } from "@/Store/AuthStore";
import LoadingSpinner from "../LoadingScreen";
import { useAdminStore } from "@/Store/AdminStore";

const AllPost = ({ active, setActive, onViewPost }) => {
  const { showAllPosts, posts, isLoading } = useAdminStore();
  const { user } = useAuthStore();

  useEffect(() => {
    showAllPosts();
  }, [showAllPosts]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 min-h-0 bg-white shadow-sm p-4 sm:p-5 overflow-y-auto">
        <h2 className="my-4 text-xl sm:text-2xl font-bold text-white bg-primary inline-block px-4 rounded-2xl">
          All Posts
        </h2>

        {posts.length === 0 && (
          <div className="text-center py-10">No posts found</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {posts.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-2xl shadow-lg w-full overflow-hidden"
            >
              <div className="relative w-full h-56 sm:h-72">
                <Image
                  src={pet.images[0].picURL}
                  alt="pet"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 sm:p-5 text-center">
                <div className="flex justify-between items-center">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    {pet.animalBreed}
                  </h2>
                  <span
                    className={`text-xs p-2 rounded-full text-white ${pet.postStatus === "visible" ? "bg-green-600" : "bg-red-600"}`}
                  >
                    {pet.postStatus}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                  {pet.description}
                </p>

                <button
                  className="primary-btn mt-4 px-6 py-2 w-full"
                  onClick={() => onViewPost(pet._id)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPost;
