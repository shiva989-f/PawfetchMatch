"use client";

import { useUserActions } from "@/Store/UserAction";
import { Pagination, Stack } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsGenderNeuter, BsSearch } from "react-icons/bs";
import { LuMapPin } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { MdFilterAltOff } from "react-icons/md";
import { useAuthStore } from "@/Store/AuthStore";
import { FaCalendarAlt } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import { poppins } from "@/app/font";

const Pets = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const { searchPets } = useUserActions();
  const { getPetsData, pets, totalPages, isLoading } = useUserActions();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  // Filter buttons
  const filters = [
    { img: "/dog.png", title: "Dogs", bgColor: "#F6EFD1" },
    { img: "/cat.png", title: "Cats", bgColor: "#F0D8CB" },
    { img: "/parrot.png", title: "Birds", bgColor: "#C4E6F2" },
    { img: "/turtle.png", title: "Turtle", bgColor: "#E4E4EC" },
    { img: "/rabbit.png", title: "Rabbits", bgColor: "#B1FFDC" },
    { img: "/hamster.png", title: "Hamster", bgColor: "#FECDD0" },
  ];

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Fetch data whenever page changes
  useEffect(() => {
    getPetsData({ page, limit: 10 });
  }, [page]);

  // Search Query and Filter
  useEffect(() => {
    if (query.trim()) {
      searchPets({
        query,
        page,
        limit: 10,
      });
    }
    if (activeFilter) {
      searchPets({
        query: activeFilter,
        page,
        limit: 10,
      });
    } else {
      getPetsData({ page, limit: 10 });
    }
  }, [page, query, activeFilter]);

  return (
    <main>
      <section className="px-4 md:px-8 pb-6">
        {/* Header */}
        <Navbar />

        {/* Search */}
        <div className="w-full mt-8 flex justify-between items-center gap-5 flex-col lg:flex-row">
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
              Adopt <span className="text-secondary">Pets</span> Today
            </h1>
            <p className="text-xs sm:text-base">
              Find your perfect furry friend
            </p>
          </div>
          <div className="w-full lg:w-1/2 flex items-center py-2 px-4 rounded-xl border border-primary bg-primary/5">
            <BsSearch />
            <input
              type="text"
              enterKeyHint="search"
              placeholder="Find your companion"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                // If input becomes empty → show all data
                if (e.target.value.trim() === "") {
                  setPage(1);
                  getPetsData({ page: 1, limit: 10 });
                }
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  if (!query.trim()) return;
                  await searchPets({ query, page: 1, limit: 10 });
                }
              }}
              className="w-full border-none outline-none pl-4"
            />
          </div>
        </div>

        <div className="relative flex w-full overflow-x-auto gap-2 mt-6 scrollbar-hide py-2">
          <div
            className="bg-secondary flex items-center justify-center gap-2 y-0.5 px-4 rounded-2xl cursor-pointer hover:scale-95 transition-all duration-100 ease-in shadow"
            onClick={() => {
              setActiveFilter("");
              setQuery("");
              setPage(1);
            }}
          >
            <MdFilterAltOff />
          </div>
          {filters.map((item, index) => (
            <div
              key={index}
              style={{ background: item.bgColor }}
              className={`shrink-0 basis-40 flex items-center justify-center gap-2 py-0.5 px-2 rounded-2xl cursor-pointer hover:scale-95 transition-all duration-100 ease-in shadow ${activeFilter === item.title ? "ring-2 ring-primary" : ""}`}
              onClick={async (e) => setActiveFilter(item.title)}
            >
              <Image width={50} height={50} src={item.img} alt={item.title} />
              <span className="text-sm md:text-base font-bold truncate">
                {item.title}
              </span>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center mt-10 text-gray-500">Loading pets...</div>
        )}

        {/* Data Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 mt-10">
            {pets?.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-500 ease-in-out hover:scale-105"
              >
                {/* Pet Image */}
                <div className="relative w-full h-52">
                  <Image
                    src={item.images?.[0]?.picURL}
                    alt={item.animalBreed}
                    fill
                    className="object-cover"
                  />
                  <span className="text-primary absolute top-2 right-2 bg-white rounded-full py-1 px-3">
                    {item.age > 1 ? `${item.age} yrs` : `${item.age} yr`}
                  </span>
                </div>

                {/* Pet Info */}
                <div className="p-4 space-y-1">
                  <div className="flex justify-between items-center gap-2">
                    <h2 className="font-semibold text-lg">
                      {item.animalBreed}
                    </h2>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "3px 10px",
                        borderRadius: 100,
                        background:
                          item.gender === "Male" ? "#dbeafe" : "#fce7f3",
                        color: item.gender === "Male" ? "#1d4ed8" : "#be185d",
                      }}
                    >
                      {item.gender}
                    </span>
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

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#000",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#fc5739 !important",
                    color: "#fff",
                  },
                }}
              />
            </Stack>
          </div>
        )}
      </section>
    </main>
  );
};

export default Pets;
