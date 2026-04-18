"use client";
import { MdReport } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbUsersGroup } from "react-icons/tb";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/Store/AuthStore";
import { FaUserEdit } from "react-icons/fa";

const Sidebar = ({ active, setActive }) => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const navItems = [
    { icon: HiOutlineDocumentText, label: "All Post" },
    { icon: TbUsersGroup, label: "All Users" },
    { icon: MdReport, label: "Reported Posts" },
    { icon: FaUserEdit, label: "Edit Profile" },
  ];

  const bottomItems = [
    { icon: RiLogoutBoxLine, label: "Log out", clickFunc: handleLogout },
  ];

  return (
    <>
      {/* ── Desktop / Tablet Sidebar ── */}
      <div className="hidden sm:flex w-16 lg:w-64 h-full bg-white shadow-2xl border-r border-gray-200 p-3 lg:p-6 flex-col font-sans shrink-0 transition-all duration-300">
        {/* Logo */}
        <div
          className="flex items-center gap-3 mb-9 cursor-pointer"
          onClick={() => router.push("/pets")}
        >
          <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center shrink-0">
            <Image src="/logo.png" width={18} height={18} alt="Logo" />
          </div>
          <span className="hidden lg:block font-extrabold text-2xl tracking-tight text-gray-900 whitespace-nowrap">
            Pawfect<span className="text-primary">.</span>
          </span>
        </div>

        {/* Nav */}
        <div className="flex-1">
          <p className="hidden lg:block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 pl-1">
            Profile
          </p>
          <nav className="flex flex-col gap-1">
            {navItems.map(({ icon: Icon, label }) => {
              const isActive = active === label;
              return (
                <button
                  key={label}
                  onClick={() => setActive(label)}
                  title={label}
                  className={`flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all duration-150 border
                    ${
                      isActive
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                >
                  <Icon size={18} className="shrink-0 mx-auto lg:mx-0" />
                  <span className="hidden lg:block">{label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-3" />

        {/* Bottom */}
        <div className="flex flex-col gap-1">
          {bottomItems.map(({ icon: Icon, label, clickFunc }) => (
            <button
              key={label}
              title={label}
              onClick={clickFunc}
              className="flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-xl text-sm w-full transition-all duration-150 border border-transparent hover:bg-gray-50 text-rose-500"
            >
              <Icon size={18} className="shrink-0 mx-auto lg:mx-0" />
              <span className="hidden lg:block">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Mobile Bottom Tab Bar ── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-lg flex items-center justify-around px-2 py-2">
        {navItems.map(({ icon: Icon, label }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-150
                ${isActive ? "text-primary" : "text-gray-400"}`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">
                {label.split(" ")[0]}
              </span>
            </button>
          );
        })}

        {bottomItems.map(({ icon: Icon, label, clickFunc }) => (
          <button
            key={label}
            onClick={clickFunc} // ← add this
            title={label}
            className="flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-xl text-sm w-full transition-all duration-150 border border-transparent hover:bg-gray-50 text-rose-500"
          >
            <Icon size={18} className="shrink-0 mx-auto lg:mx-0" />
            <span className="hidden lg:block">{label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
