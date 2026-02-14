import { poppins } from "./font";
import "./globals.css";

export const metadata = {
  title: "Pet Adoption App",
  description:
    "This platform is for those who want to adopt pet or put their pet for adoption.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
