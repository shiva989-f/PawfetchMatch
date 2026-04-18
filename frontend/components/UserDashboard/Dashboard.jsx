import { useEffect } from "react";
import {
  MdVerified,
  MdEmail,
  MdLocationOn,
  MdEdit,
  MdEditNote,
  MdFolderDelete,
} from "react-icons/md";
import Image from "next/image";
import { useAuthStore } from "@/Store/AuthStore";
import { useUserActions } from "@/Store/UserAction";
import LoadingSpinner from "../LoadingScreen";

const Dashboard = ({ active, setActive, onEditPost }) => {
  const { showUserPosts, userPosts, deletePost, isLoading } = useUserActions();
  const { user } = useAuthStore();

  useEffect(() => {
    showUserPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    deletePost({ postId });
  };

  if (!userPosts || isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Profile Card */}
      <div className="bg-white shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-400 overflow-hidden ring-4 ring-purple-200 shrink-0">
            <Image
              width={500}
              height={500}
              src={user.profilePicUrl}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-extrabold text-lg sm:text-xl text-gray-900 tracking-tight">
                {user.username}
              </span>
              <MdVerified className="text-primary text-lg" />
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs mb-0.5">
              <MdEmail size={13} />
              <span className="truncate max-w-40 sm:max-w-none">
                {user.email}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <MdLocationOn size={13} />
              <span>{user.address.city},</span>
              <span>{user.address.country}</span>
            </div>
          </div>
        </div>
        <button
          className="flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-150 w-full sm:w-auto justify-center"
          onClick={() => setActive("Edit Profile")}
        >
          <MdEdit size={14} />
          Edit Profile
        </button>
      </div>

      {/* Posts Grid */}
      <div className="flex-1 min-h-0 bg-white  shadow-sm p-4 sm:p-5 overflow-y-auto">
        <h2 className="my-4 text-xl sm:text-2xl font-bold text-white bg-primary inline-block px-4 rounded-2xl">
          Your Posts
        </h2>
        {/* No Post */}
        {userPosts.length === 0 && (
          <div className="h-screen flex flex-col items-center justify-center py-14 px-6 text-center">
            <div
              className="w-22 h-22 rounded-full bg-[#fff3f0] border-2 border-dashed border-[#fc573944]
                    flex items-center justify-center text-4xl
                    animate-[float_3.5s_ease-in-out_infinite]"
            >
              🐾
            </div>
            <p className="mt-5 text-xl font-medium text-gray-900">
              No posts{" "}
              <em
                className="font-bold text-primary not-italic"
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontStyle: "italic",
                }}
              >
                yet.
              </em>
            </p>
            <p className="mt-2 text-sm text-gray-400 max-w-60 leading-relaxed">
              You haven't listed any pets for adoption. Share one and help them
              find a loving home.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {userPosts.map((pet) => (
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
              <div className="bg-white p-4 sm:p-5 text-center rounded-tl-2xl rounded-tr-2xl">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  {pet.animalBreed}{" "}
                  <span className="text-gray-400 text-sm font-normal">
                    (
                    {pet.age > 1
                      ? `${pet.age} years old`
                      : `${pet.age} year old`}
                    )
                  </span>
                </h2>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-3">
                  {pet.description}
                </p>
                <div className="w-full flex-col md:flex-row flex justify-between items-center">
                  <button
                    className="flex items-center gap-2 primary-btn mt-4 sm:mt-5 text-sm font-semibold px-6 py-2 rounded-lg transition w-full md:w-auto"
                    onClick={() => onEditPost(pet._id)}
                  >
                    <MdEditNote className="text-2xl" />
                    Edit Post
                  </button>

                  <button
                    className="flex items-center gap-2 justify-center secondary-btn mt-4 sm:mt-5 text-sm font-semibold px-6 py-2 rounded-lg transition w-full md:w-auto"
                    onClick={() => handleDeletePost(pet._id)}
                  >
                    <MdFolderDelete className="text-2xl" />
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
