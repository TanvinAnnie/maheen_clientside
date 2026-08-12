"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

import type { PhotoAlbum } from "@/lib/api/photoAlbums";

type PhotoAlbumsProps = {
  photoAlbums: PhotoAlbum | null;
};

export default function PhotoAlbums({
  photoAlbums,
}: PhotoAlbumsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (
    !photoAlbums ||
    !photoAlbums.isPublished ||
    photoAlbums.items.length === 0
  ) {
    return null;
  }

  const items = photoAlbums.items;

  const totalItems = items.length;

  const getIndex = (index: number) => {
    return (index + totalItems) % totalItems;
  };

  const previousIndex = getIndex(currentIndex - 1);
  const nextIndex = getIndex(currentIndex + 1);

  const goToPrevious = () => {
    setCurrentIndex((prev) => getIndex(prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => getIndex(prev + 1));
  };

  const currentItem = items[currentIndex];
  const previousItem = items[previousIndex];
  const nextItem = items[nextIndex];

  return (
    <section className="relative w-full overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <div className="relative z-20 mx-auto px-5 text-center sm:px-8">
        {/* EYEBROW */}

        <p className="mb-5 text-[11px] font-medium tracking-[0.18em] text-[#7890dc] sm:text-xs">
          {photoAlbums.eyebrow}
        </p>

        {/* TITLE */}

        <h2 className="mx-auto max-w-[950px] text-[42px] font-light leading-[0.98] tracking-[-0.045em] text-black sm:text-[52px] md:text-[64px] lg:text-[72px]">
          {photoAlbums.title}{" "}
          <span className="font-serif italic">
            {photoAlbums.highlightedTitle}
          </span>
          <br />
          {photoAlbums.secondTitle}
        </h2>
      </div>

      {/* ========================================================= */}
      {/* PORTFOLIO BACKGROUND TEXT */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[25px] left-1/2 z-0 -translate-x-1/2 whitespace-nowrap select-none text-[150px] font-serif font-light leading-none tracking-[-0.06em] text-[#111111]/60 sm:text-[220px] md:text-[280px] lg:text-[330px] xl:text-[360px]"
      >
        PORTFOLIO
      </div>

      {/* ========================================================= */}
      {/* CAROUSEL */}
      {/* ========================================================= */}

      <div className="relative z-10 mt-16 w-full sm:mt-20 lg:mt-24">
        <div className="relative mx-auto flex h-[430px] w-full items-center justify-center sm:h-[470px] lg:h-[500px]">
          {/* ===================================================== */}
          {/* LEFT ARROW */}
          {/* ===================================================== */}

          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous photo album"
            className="absolute left-[10px] top-1/2 z-40 hidden -translate-y-1/2 items-center justify-center text-black transition-transform duration-300 hover:-translate-x-1 sm:flex lg:left-[calc(50%-590px)]"
          >
            <ArrowLeft
              size={42}
              strokeWidth={1.5}
            />
          </button>

          {/* ===================================================== */}
          {/* RIGHT ARROW */}
          {/* ===================================================== */}

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next photo album"
            className="absolute right-[10px] top-1/2 z-40 hidden -translate-y-1/2 items-center justify-center text-black transition-transform duration-300 hover:translate-x-1 sm:flex lg:right-[calc(50%-590px)]"
          >
            <ArrowRight
              size={42}
              strokeWidth={1.5}
            />
          </button>

          {/* ===================================================== */}
          {/* LEFT CARD */}
          {/* ===================================================== */}

          <div
            className="
              absolute
              left-1/2
              z-10
              hidden
              h-[390px]
              w-[330px]
              -translate-x-[calc(50%+690px)]
              overflow-hidden
              rounded-[15px]
              bg-[#eeeeee]
              shadow-[0_15px_45px_rgba(0,0,0,0.08)]
              md:block
              lg:h-[395px]
              lg:w-[370px]
            "
          >
            <Image
              src={previousItem.image}
              alt={
                previousItem.title ||
                "Maheen Accessories"
              }
              fill
              sizes="370px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* ===================================================== */}
          {/* CENTER CARD */}
          {/* ===================================================== */}

          <article
            key={currentItem._id}
            className="
              relative
              z-30
              h-[390px]
              w-[calc(100%-32px)]
              max-w-[760px]
              overflow-hidden
              rounded-[15px]
              border
              border-black/10
              bg-[#eeeeee]
              shadow-[0_25px_70px_rgba(0,0,0,0.18)]
              sm:h-[410px]
              sm:w-[620px]
              md:h-[430px]
              md:w-[680px]
              lg:h-[450px]
              lg:w-[760px]
            "
          >
            {/* IMAGE */}

            <Image
              src={currentItem.image}
              alt={
                currentItem.title ||
                "Maheen Accessories"
              }
              fill
              priority
              sizes="
                (max-width: 640px) calc(100vw - 32px),
                (max-width: 768px) 620px,
                (max-width: 1024px) 680px,
                760px
              "
              className="object-cover"
            />

            {/* DARK GRADIENT */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            {/* ================================================= */}
            {/* TOP RIGHT CIRCLE BUTTON */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next photo"
              className="
                absolute
                right-5
                top-5
                z-20
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-white
                text-[#7890dc]
                shadow-sm
                transition-all
                duration-300
                hover:scale-105
                hover:bg-[#7890dc]
                hover:text-white
                sm:right-7
                sm:top-7
              "
            >
              <ChevronRight
                size={23}
                strokeWidth={1.5}
              />
            </button>

            {/* ================================================= */}
            {/* CENTER CARD CONTENT */}
            {/* ================================================= */}

            <div className="absolute bottom-7 left-7 z-20 text-white sm:bottom-8 sm:left-9">
              {/* NUMBER */}

              <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-white/80">
                {String(
                  currentItem.order
                ).padStart(2, "0")}
              </p>

              {/* TITLE */}

              <h3 className="text-[21px] font-normal tracking-[-0.02em] sm:text-[24px]">
                {currentItem.title}
              </h3>

              {/* SUBTITLE */}

              {currentItem.subtitle && (
                <p className="mt-1 text-[10px] font-medium tracking-[0.15em] text-white/75">
                  {currentItem.subtitle}
                </p>
              )}
            </div>
          </article>

          {/* ===================================================== */}
          {/* RIGHT CARD */}
          {/* ===================================================== */}

          <div
            className="
              absolute
              left-1/2
              z-10
              hidden
              h-[390px]
              w-[330px]
              translate-x-[calc(50%+360px)]
              overflow-hidden
              rounded-[15px]
              bg-[#eeeeee]
              shadow-[0_15px_45px_rgba(0,0,0,0.08)]
              md:block
              lg:h-[395px]
              lg:w-[370px]
            "
          >
            <Image
              src={nextItem.image}
              alt={
                nextItem.title ||
                "Maheen Accessories"
              }
              fill
              sizes="370px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE CONTROLS */}
        {/* ========================================================= */}

        <div className="mt-7 flex items-center justify-center gap-8 sm:hidden">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous photo album"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-black transition hover:bg-black hover:text-white"
          >
            <ArrowLeft
              size={18}
              strokeWidth={1.5}
            />
          </button>

          {/* DOTS */}

          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <button
                key={item._id}
                type="button"
                onClick={() =>
                  setCurrentIndex(index)
                }
                aria-label={`Go to photo ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 bg-black"
                    : "w-1.5 bg-black/30"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next photo album"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-black transition hover:bg-black hover:text-white"
          >
            <ArrowRight
              size={18}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </section>
  );
}