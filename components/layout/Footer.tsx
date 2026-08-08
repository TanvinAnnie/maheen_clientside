"use client";

import Link from "next/link";

const leftLinks = [
  { label: "ABOUT US", href: "/about" },
  { label: "OUR MANAGEMENT", href: "/management" },
  { label: "PRODUCTS", href: "/products" },
  { label: "GALLERY", href: "/gallery" },
  { label: "POLICIES", href: "/policies" },
];

const rightLinks = [
  { label: "SUSTAINABILITY", href: "/sustainability" },
  { label: "PRODUCT FACILITIES", href: "/production-facilities" },
  { label: "OUR PARTNERS", href: "/partners" },
  { label: "LATEST NEWS", href: "/news" },
  { label: "CONTACT US", href: "/contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#111111] text-white">
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(
              30deg,
              #0000 12%,
              rgba(255,255,255,0.13) 13%,
              rgba(255,255,255,0.13) 14%,
              #0000 15%
            ),
            linear-gradient(
              150deg,
              #0000 12%,
              rgba(255,255,255,0.13) 13%,
              rgba(255,255,255,0.13) 14%,
              #0000 15%
            )
          `,
          backgroundSize: "16px 16px",
        }}
      />

      {/* Decorative arc */}
      <div className="pointer-events-none absolute left-1/2 top-[72px] h-[460px] w-[740px] -translate-x-1/2 rounded-t-full border border-white/[0.07] border-b-0" />

      {/* Center vertical line */}
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-[72px] w-px -translate-x-1/2 bg-white/[0.09] md:block" />

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-[1068px] px-6 pb-[72px] pt-[78px] lg:px-0">
        {/* Logo */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-[7px]"
          >
            <div className="relative h-[34px] w-[40px] shrink-0">
              <div className="absolute left-[1px] top-[11px] h-[19px] w-[14px] rotate-[38deg] border-l-[4px] border-t-[4px] border-[#8b6ed1]" />

              <div className="absolute left-[12px] top-[3px] h-[25px] w-[16px] rotate-[38deg] border-l-[4px] border-t-[4px] border-[#6b8fe7]" />

              <div className="absolute left-[24px] top-[11px] h-[19px] w-[14px] rotate-[38deg] border-l-[4px] border-t-[4px] border-[#9a75d8]" />
            </div>

            <div className="leading-[11px]">
              <div className="text-[13px] font-medium">
                MAHEEN
              </div>

              <div className="text-[13px] font-medium">
                ACCESSORIES
                <span className="ml-[3px] align-top text-[6px] text-[#8474d8]">
                  ltd.
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Three columns */}
        <div className="mt-[50px] grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.3fr_1fr] md:gap-[55px]">
          {/* Left */}
          <nav className="flex flex-col gap-[19px]">
            {leftLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-fit text-[12px] font-light tracking-[2.8px] text-[#dddddd] transition-colors duration-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Newsletter */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[14px] font-light uppercase leading-[20px] tracking-[2.4px] text-[#dddddd]">
              EXPRESS YOUR THOUGHT
              <br />
              VIA EMAIL
            </h3>

            <form
              className="mt-[22px] flex h-[42px] w-full max-w-[343px] border border-white/[0.12]"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent px-[16px] text-[11px] font-light text-white outline-none placeholder:text-[#5d5d5d]"
              />

              <button
                type="submit"
                className="flex w-[153px] shrink-0 items-center justify-center gap-[25px] border-l border-white/[0.12] text-[9px] tracking-[2px] text-[#dddddd] transition-colors duration-300 hover:bg-white/[0.06]"
              >
                SEND
                <span className="text-[14px]">↗</span>
              </button>
            </form>
          </div>

          {/* Right */}
          <nav className="flex flex-col gap-[19px] md:items-end">
            {rightLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-fit text-[12px] font-light tracking-[2.8px] text-[#dddddd] transition-colors duration-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/[0.09]">
        <div className="mx-auto flex min-h-[52px] w-full max-w-[1068px] items-center justify-between px-6 lg:px-0">
          {/* Copyright */}
          <p className="text-[11px] font-light text-[#c8c8c8]">
            Goinnovior&nbsp;&nbsp; Limited, All Rights Reserved
          </p>

          {/* Social + top */}
          <div className="flex items-center gap-[12px]">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-[25px] w-[25px] items-center justify-center rounded-full border border-white/70 text-[11px] transition-all hover:bg-white hover:text-[#111111]"
            >
              f
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-[25px] w-[25px] items-center justify-center rounded-full border border-white/70 text-[10px] transition-all hover:bg-white hover:text-[#111111]"
            >
              ◎
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-[25px] w-[25px] items-center justify-center rounded-full border border-white/70 text-[9px] font-semibold transition-all hover:bg-white hover:text-[#111111]"
            >
              in
            </a>

            <button
              type="button"
              aria-label="Back to top"
              onClick={scrollToTop}
              className="ml-[10px] flex h-[44px] w-[44px] items-center justify-center rounded-[2px] bg-[#8d6bd7] text-[20px] transition-all duration-300 hover:-translate-y-1 hover:bg-[#7657c0]"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}