import { useAuthStore } from "@/Store/AuthStore";
import { poppins } from "./font";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Pet Adoption App",
  description:
    "This platform is for those who want to adopt pet or put their pet for adoption.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
