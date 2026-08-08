"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "SUSTAINABILITY", href: "/sustainability" },
  { label: "PRODUCTS", href: "/products" },
  { label: "POLICIES", href: "/policies" },
  {
    label: "PRODUCTION FACILITIES",
    href: "/production-facilities",
  },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-[100] w-full bg-white">
        <div className="mx-auto flex h-[88px] w-full max-w-[1220px] items-center px-6 lg:px-0">
          {/* =====================================================
              LOGO
          ===================================================== */}

          <Link
            href="/"
            className="group flex shrink-0 items-center"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              {/* Logo Mark */}
              <div className="relative flex h-[42px] w-[48px] items-center justify-center">
                <div className="absolute left-[2px] top-[13px] h-[23px] w-[17px] rotate-[38deg] border-l-[6px] border-t-[6px] border-[#8b6ed1]" />

                <div className="absolute left-[15px] top-[5px] h-[30px] w-[18px] rotate-[38deg] border-l-[6px] border-t-[6px] border-[#6b8fe7]" />

                <div className="absolute left-[28px] top-[13px] h-[23px] w-[17px] rotate-[38deg] border-l-[6px] border-t-[6px] border-[#9a75d8]" />
              </div>

              {/* Logo Text */}
              <div className="leading-none">
                <div className="text-[16px] font-semibold tracking-[-0.5px] text-[#151515]">
                  MAHEEN
                </div>

                <div className="text-[16px] font-semibold tracking-[-0.5px] text-[#151515]">
                  ACCESSORIES
                  <span className="ml-1 text-[9px] font-normal text-[#7f74d6]">
                    ltd.
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* =====================================================
              DIVIDER
          ===================================================== */}

          <div className="mx-7 hidden h-[28px] w-px bg-[#d8d8d8] xl:block" />

          {/* =====================================================
              EMAIL
          ===================================================== */}

          <a
            href="mailto:info@maheenaccessories.com"
            className="hidden whitespace-nowrap text-[9px] tracking-[0.1px] text-[#555] transition-colors hover:text-black xl:block"
          >
            <span className="mr-2 text-[10px]">✉</span>
            info@maheenaccessories.com
          </a>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}

          <nav className="ml-auto hidden items-center gap-[27px] lg:flex">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative whitespace-nowrap py-[34px] text-[10px] font-medium tracking-[1px] text-[#303030] transition-colors hover:text-[#7e70d3] ${
                  index === 0 ? "text-[#202020]" : ""
                }`}
              >
                {item.label}

                {/* Active underline for HOME */}
                {index === 0 && (
                  <span className="absolute bottom-[18px] left-0 h-[1px] w-full bg-[#91a7ee]" />
                )}

                {/* Hover underline */}
                <span className="absolute bottom-[18px] left-0 h-[1px] w-0 bg-[#91a7ee] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* =====================================================
              RIGHT ACTIONS
          ===================================================== */}

          <div className="ml-7 hidden items-center gap-7 lg:flex">
            {/* Hamburger */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="group flex h-8 w-8 items-center justify-center"
            >
              <span className="flex w-[28px] flex-col gap-[6px]">
                <span className="block h-[1px] w-full bg-[#555] transition-transform duration-300 group-hover:translate-x-1" />
                <span className="block h-[1px] w-[20px] bg-[#555] transition-transform duration-300 group-hover:translate-x-1" />
                <span className="block h-[1px] w-full bg-[#555] transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>

            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="flex h-8 w-8 items-center justify-center"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="10.8"
                  cy="10.8"
                  r="6.8"
                  stroke="#555"
                  strokeWidth="1.5"
                />

                <path
                  d="M16 16L21 21"
                  stroke="#555"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ===================================================== */}

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="ml-auto flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span className="flex w-6 flex-col gap-[5px]">
              <span className="h-[1.5px] w-full bg-black" />
              <span className="h-[1.5px] w-full bg-black" />
              <span className="h-[1.5px] w-full bg-black" />
            </span>
          </button>
        </div>

        {/* =======================================================
            MOBILE NAVIGATION
        ======================================================= */}

        <div
          className={`overflow-hidden border-t border-[#eeeeee] bg-white transition-all duration-500 lg:hidden ${
            menuOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="mx-auto flex max-w-[1220px] flex-col px-6 py-5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-[#eeeeee] py-4 text-[11px] font-medium tracking-[1.2px] text-[#222] transition-colors hover:text-[#7e70d3]"
              >
                {item.label}
              </Link>
            ))}

            <a
              href="mailto:info@maheenaccessories.com"
              className="pt-5 text-[10px] text-[#555]"
            >
              info@maheenaccessories.com
            </a>
          </nav>
        </div>

        {/* =======================================================
            DESKTOP DROPDOWN MENU
        ======================================================= */}

        <div
          className={`absolute right-6 top-[78px] hidden w-[230px] border border-[#eeeeee] bg-white p-6 shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300 lg:block xl:right-[calc((100vw-1220px)/2)] ${
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <p className="mb-5 text-[10px] tracking-[1.5px] text-[#888]">
            QUICK MENU
          </p>

          <div className="flex flex-col">
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#eeeeee] py-3 text-[11px] text-[#222] hover:text-[#7e70d3]"
            >
              ABOUT US
            </Link>

            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#eeeeee] py-3 text-[11px] text-[#222] hover:text-[#7e70d3]"
            >
              PRODUCTS
            </Link>

            <Link
              href="/policies"
              onClick={() => setMenuOpen(false)}
              className="border-b border-[#eeeeee] py-3 text-[11px] text-[#222] hover:text-[#7e70d3]"
            >
              POLICIES
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-[11px] text-[#222] hover:text-[#7e70d3]"
            >
              CONTACT
            </Link>
          </div>
        </div>
      </header>

      {/* Navbar spacer */}
      <div className="h-[88px]" />
    </>
  );
}