import React from "react";
import { BsSearch } from "react-icons/bs";

const Pets = () => {
  return (
    <main>
      <section>
        {/* Top Header */}
        <div className="text-center">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4">
            Adopt <span className="text-secondary">Pets</span> Today
          </h1>
          <p className="text-xs sm:text-base">Find your perfect fury friend</p>
        </div>

        {/* Search Container */}
        <div className="w-full mt-4">
          <div className="flex-1 flex justify-start items-center gap-5 py-2 px-4 rounded-xl border border-primary">
            <BsSearch />
            <input
              type="text"
              placeholder="Type a query"
              className="w-full border-none outline-none pl-6 pr-2"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Pets;
