"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Projects", href: "/projects" },
    { label: "Apply", href: "/recruitments" },
  ];

  return (
    <section className="z-50 absolute left-0 top-0 w-full px-8 md:px-24 py-8 md:py-12">
      <div className="flex justify-between items-center border-b-2 border-light py-2 relative">
        {/* Brand Logo */}
        <span className="text-xl font-bold z-50">OSPC</span>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="text-lg flex flex-row gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger Menu Button (Mobile Only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 md:hidden z-50 focus:outline-none cursor-pointer p-1"
          aria-label="Toggle Menu"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Mobile Navigation Dropdown Overlay */}
        <div
          className={`absolute top-full left-0 w-full mt-2 bg-background/95 border border-white/10 text-light/80   p-6 flex flex-col md:hidden transition-all duration-300 transform origin-top ${
            isOpen
              ? "opacity-100 scale-y-100 visible"
              : "opacity-0 scale-y-95 invisible"
          }`}
        >
          <nav>
            <ul className="flex flex-col gap-6 text-lg font-mono">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-light/90 hover:text-primary transition-colors py-1 border-b border-white/5 uppercase tracking-wider"
                  >
                    // {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
