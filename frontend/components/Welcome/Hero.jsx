import { alkatra } from "@/app/font";
import Image from "next/image";
import { MdOutlineSearch } from "react-icons/md";

const Hero = () => {
  return (
    <section>
      <div id="container">
        {/* Left side container with texts */}
        <div className="left">
          <div className="mb-4">
            <h1
              className={`text-center md:text-start text-5xl lg:text-7xl font-bold ${alkatra.className}`}
            >
              Find Your Perfect
            </h1>
            <h1
              className={`text-center md:text-start text-5xl lg:text-7xl font-bold text-secondary ${alkatra.className}`}
            >
              Companion
            </h1>
          </div>
          <div>
            <p
              className={`text-center md:text-start ${alkatra.className} text-xl md:text-2xl`}
            >
              Adopt dogs, cats & rescued animal looking
            </p>
            <p
              className={`text-center md:text-start ${alkatra.className} text-xl md:text-2xl`}
            >
              for a loving home.
            </p>
          </div>
          <button className="primary-btn mt-8 block mx-auto md:mx-0">
            Adopt Companion
          </button>
        </div>
        {/* Right side Container with Hero Image */}
        <div className="right relative">
          <div className="absolute -inset-10 bg-secondary/20 blur-3xl rounded-full"></div>
          <Image
            loading="eager"
            src="/hero_img.webp"
            alt="Hero Image"
            width={500}
            height={500}
            className="relative z-10 drop-shadow-2xl"
          />
        </div>
      </div>
      <div className="searchStatsBar">
        <div className="searchBar">
          <input type="Search" placeholder="Search..." />
          <MdOutlineSearch className="text-2xl text-secondary" />
        </div>
        <div className="statsContainer">
          <div className="stats">
            <p>5k</p>
            <p>Total Dogs</p>
          </div>
          <div className="stats">
            <p>7.5k</p>
            <p>Total Birds</p>
          </div>
          <div className="stats border-none">
            <p>6k</p>
            <p>Total Cats</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
