"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

import type { Hero as HeroType } from "@/lib/api/hero";

type HeroProps = {
  hero: HeroType | null;
};

export default function Hero({ hero }: HeroProps) {
  const [currentSlide, setCurrentSlide] =
    useState(0);

  /*
   * -------------------------------------------------------
   * SAFETY CHECK
   * -------------------------------------------------------
   */

  if (
    !hero ||
    !Array.isArray(hero.slides) ||
    hero.slides.length === 0
  ) {
    return (
      <section className="relative flex min-h-[700px] items-center justify-center bg-black">
        <div className="px-6 text-center text-white">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            Maheen Accessories
          </p>

          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Hero content unavailable
          </h1>
        </div>
      </section>
    );
  }

  /*
   * -------------------------------------------------------
   * CURRENT SLIDE
   * -------------------------------------------------------
   */

  const safeSlideIndex =
    Math.min(
      currentSlide,
      hero.slides.length - 1
    );

  const slide = hero.slides[safeSlideIndex];

  /*
   * -------------------------------------------------------
   * SLIDE NAVIGATION
   * -------------------------------------------------------
   */

  const goPrevious = () => {
    setCurrentSlide((previous) =>
      previous === 0
        ? hero.slides.length - 1
        : previous - 1
    );
  };

  const goNext = () => {
    setCurrentSlide((previous) =>
      previous === hero.slides.length - 1
        ? 0
        : previous + 1
    );
  };

  /*
   * -------------------------------------------------------
   * RENDER
   * -------------------------------------------------------
   */

  return (
    <section className="relative min-h-[calc(100vh-112px)] overflow-hidden bg-black">
      {/* ===================================================
          BACKGROUND IMAGE
      =================================================== */}

      {slide.backgroundImage && (
        <img
          src={slide.backgroundImage}
          alt={slide.title || "Maheen Accessories"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* ===================================================
          DARK OVERLAY
      =================================================== */}

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />

      {/* ===================================================
          DECORATIVE GRID
      =================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[7%] top-0 h-full w-px bg-white/10" />

        <div className="absolute left-[24%] top-0 h-full w-px bg-white/10" />

        <div className="absolute left-[42%] top-0 h-full w-px bg-white/10" />

        <div className="absolute left-[60%] top-0 h-full w-px bg-white/10" />

        <div className="absolute left-[78%] top-0 h-full w-px bg-white/10" />

        <div className="absolute left-[94%] top-0 h-full w-px bg-white/10" />
      </div>

      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-112px)] max-w-[1220px] items-center px-6 py-20 lg:px-10">
        <div className="max-w-[720px]">
          {/* EYEBROW */}

          {slide.eyebrow && (
            <p className="text-sm font-medium uppercase tracking-wide text-white sm:text-base">
              {slide.eyebrow}
            </p>
          )}

          {/* TITLE */}

          <h1 className="mt-7 max-w-[720px] text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            {slide.title}
          </h1>

          {/* DESCRIPTION */}

          {slide.description && (
            <p className="mt-7 max-w-[690px] text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              {slide.description}
            </p>
          )}

          {/* BUTTONS */}

          <div className="mt-9 flex flex-wrap gap-4">
            {slide.primaryButton?.enabled && (
              <Link
                href={
                  slide.primaryButton.link ||
                  "/contact"
                }
                className="group inline-flex min-h-[50px] items-center gap-8 bg-[#8fcbea] px-7 text-sm font-medium text-black transition hover:bg-white"
              >
                <span>
                  {slide.primaryButton.text}
                </span>

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            )}

            {slide.secondaryButton?.enabled && (
              <Link
                href={
                  slide.secondaryButton.link ||
                  "/products"
                }
                className="group inline-flex min-h-[50px] items-center gap-8 border border-white/70 bg-black/10 px-7 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
              >
                <span>
                  {slide.secondaryButton.text}
                </span>

                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================
          SOCIAL LINKS
      =================================================== */}

      {Array.isArray(slide.socialLinks) &&
        slide.socialLinks.length > 0 && (
          <div className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 lg:right-10">
            {slide.socialLinks
              .filter(
                (social) => social.enabled
              )
              .map((social) => (
                <a
                  key={social.platform}
                  href={social.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    social.platform
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 text-xs uppercase text-white transition hover:bg-white hover:text-black"
                >
                  {social.platform ===
                    "facebook" && "f"}

                  {social.platform ===
                    "instagram" && "ig"}

                  {social.platform ===
                    "linkedin" && "in"}
                </a>
              ))}
          </div>
        )}

      {/* ===================================================
          BOTTOM SLIDER CONTROLS
      =================================================== */}

      <div className="absolute bottom-8 left-1/2 z-20 flex w-full max-w-[720px] -translate-x-1/2 items-center justify-between px-6">
        {/* PREVIOUS */}

        <button
          type="button"
          onClick={goPrevious}
          className="text-xs font-medium uppercase text-white transition hover:text-[#8fcbea]"
        >
          Prev
        </button>

        {/* DOTS */}

        <div className="flex items-center gap-4">
          {hero.slides.map(
            (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() =>
                  setCurrentSlide(index)
                }
                aria-label={`Go to slide ${
                  index + 1
                }`}
                className={`h-2 w-2 rounded-full transition ${
                  index ===
                  safeSlideIndex
                    ? "scale-125 bg-white"
                    : "bg-white/50"
                }`}
              />
            )
          )}
        </div>

        {/* NEXT */}

        <button
          type="button"
          onClick={goNext}
          className="text-xs font-medium uppercase text-white transition hover:text-[#8fcbea]"
        >
          Next
        </button>
      </div>

      {/* ===================================================
          ARROW BUTTONS
      =================================================== */}

      {hero.slides.length > 1 && (
        <div className="absolute bottom-6 right-6 z-20 hidden items-center gap-2 sm:flex lg:right-10">
          <button
            type="button"
            onClick={goPrevious}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-white transition hover:bg-white hover:text-black"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 text-white transition hover:bg-white hover:text-black"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}