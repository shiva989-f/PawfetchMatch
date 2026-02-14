import { alkatra } from "@/app/font";
import React from "react";

const Story = () => {
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
    </section>
  );
};

export default Story;
