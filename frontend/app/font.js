import { Alkatra, Corinthia, Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const alkatra = Alkatra({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const corinthia = Corinthia({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
