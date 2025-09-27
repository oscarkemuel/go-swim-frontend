"use client";

import { useState } from "react";
import { Button } from "@/components/lib/Button";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/home" className="text-2xl font-bold text-[#3A36DB]">
          AquaTimer
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link href="/home#features" className="hover:text-[#3A36DB]">
            Recursos
          </Link>
          <Link href="/home#testimonials" className="hover:text-[#3A36DB]">
            Depoimentos
          </Link>
          <Link href="/home#cta" className="hover:text-[#3A36DB]">
            Começar
          </Link>
          <Link href="/sign-in">
            <Button color="gray">Entrar</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-700 hover:text-[#3A36DB]"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="md:hidden flex flex-col gap-4 px-6 pb-6 text-gray-700 font-medium bg-white shadow-md">
          <Link
            href="/home#features"
            className="hover:text-[#3A36DB]"
            onClick={() => setOpen(false)}
          >
            Recursos
          </Link>
          <Link
            href="/home#testimonials"
            className="hover:text-[#3A36DB]"
            onClick={() => setOpen(false)}
          >
            Depoimentos
          </Link>
          <Link
            href="/home#cta"
            className="hover:text-[#3A36DB]"
            onClick={() => setOpen(false)}
          >
            Começar
          </Link>
          <Link href="/sign-in" onClick={() => setOpen(false)}>
            <Button color="gray" className="w-full">
              Entrar
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
