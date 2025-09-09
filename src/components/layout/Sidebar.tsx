"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSwim } from "react-icons/bi";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { ChartColumnIncreasing, Dumbbell, Timer } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Início", icon: <ChartColumnIncreasing size={20} />, pathMatch: "/dashboard" },
  { href: "/dashboard/workouts", label: "Treinos", icon: <Dumbbell size={20} />, pathMatch: "/workouts" },
  { href: "/dashboard/timer", label: "Executar Treino", icon: <Timer size={20} />, pathMatch: "/timer" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
      </button>

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#F3F6FD] px-2 py-6 flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          z-50
          md:translate-x-0 md:static md:flex
        `}
      >
        <div className="flex items-center gap-2 mb-10 px-5">
          <BiSwim className="text-2xl" />
          <h2 className="text-lg font-bold">GoSwim</h2>
        </div>
        <nav className="flex flex-col gap-2 w-full px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 py-3 px-5 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-[#3A36DB] text-white"
                  : "text-[#99B2C6] hover:bg-[#E0E7FF]"
              }`}
            >
              <div className="text-4xl">{item.icon}</div>
              <p className="font-semibold">{item.label}</p>
            </Link>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
