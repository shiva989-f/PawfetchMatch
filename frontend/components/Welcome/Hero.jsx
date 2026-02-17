import { alkatra } from "@/app/font";
import Image from "next/image";
import { MdOutlineSearch } from "react-icons/md";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

// Plugins
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const Hero = () => {
  const heroImage = useRef(null);
  const heroText1 = useRef(null);
  const heroText2 = useRef(null);
  const paraText1 = useRef(null);
  const paraText2 = useRef(null);
  const btnText = useRef(null);
  const searchBar = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 🔹 Heading Animation
    tl.from([heroText1.current, heroText2.current], {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
    })

      // 🔹 Image Animation
      .from(
        heroImage.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 1,
        },
        "-=0.5",
      );

    // 🔹 Split Paragraph
    const split1 = new SplitText(paraText1.current, {
      type: "words, lines",
      linesClass: "line",
    });

    const split2 = new SplitText(paraText2.current, {
      type: "words, lines",
    });

    tl.from([...split1.words, ...split2.words], {
      y: 40,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
    });

    return () => {
      split1.revert();
      split2.revert();
    };
  }, {});
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(btnText.current, {
      y: 80,
      opacity: 0,
      scale: 3,
      duration: 1,
      ease: "back.out(1.7)",
    });
  });

  return (
    <section>
      <div id="container">
        {/* Left side container with texts */}
        <div className="left">
          <div className="mb-4">
            <h1
              ref={heroText1}
              className={`text-center md:text-start text-5xl lg:text-7xl font-bold ${alkatra.className}`}
            >
              Find Your Perfect
            </h1>
            <h1
              ref={heroText2}
              className={`text-center md:text-start text-5xl lg:text-7xl font-bold text-secondary ${alkatra.className}`}
            >
              Companion
            </h1>
          </div>
          <div>
            <p
              ref={paraText1}
              className={`text-center md:text-start ${alkatra.className} text-xl md:text-2xl`}
            >
              Adopt dogs, cats & rescued animal looking
            </p>
            <p
              ref={paraText2}
              className={`text-center md:text-start ${alkatra.className} text-xl md:text-2xl`}
            >
              for a loving home.
            </p>
          </div>
          <button
            ref={btnText}
            className="primary-btn mt-8 block mx-auto md:mx-0"
          >
            Adopt Companion
          </button>
        </div>
        {/* Right side Container with Hero Image */}
        <div className="right relative">
          <div className="absolute -inset-10 bg-secondary/20 blur-3xl rounded-full"></div>
          <Image
            ref={heroImage}
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
