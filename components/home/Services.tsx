"use client";

import Image from "next/image";

import type {
  ServicesData,
  ServiceItem,
} from "@/lib/api/services";

type ServicesProps = {
  services: ServicesData | null;
};

export default function Services({
  services,
}: ServicesProps) {
  if (!services || !services.isPublished) {
    return null;
  }

  const serviceItems = services.items;

  if (serviceItems.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 md:px-10 lg:px-16 xl:px-24">
      {/* Decorative wave lines - left */}
      <div className="pointer-events-none absolute left-[-5%] top-[52%] hidden h-[220px] w-[35%] md:block">
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={`left-${index}`}
            className="absolute left-0 h-px w-full bg-black/60"
            style={{
              top: `${index * 9}px`,
              transform: `rotate(${index * 0.75 - 6}deg)`,
              transformOrigin: "left center",
            }}
          />
        ))}
      </div>

      {/* Decorative wave lines - right */}
      <div className="pointer-events-none absolute right-[-5%] top-[52%] hidden h-[220px] w-[35%] md:block">
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={`right-${index}`}
            className="absolute right-0 h-px w-full bg-black/60"
            style={{
              top: `${index * 9}px`,
              transform: `rotate(${6 - index * 0.75}deg)`,
              transformOrigin: "right center",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left */}
          <div>
            <div className="mb-5 flex items-center text-sm font-medium tracking-wide">
              <span className="font-semibold text-[#8c73df]">
                {services.eyebrow.split("//")[0]?.trim()}
              </span>

              <span className="mx-1 text-[#8c73df]">{'//'}</span>

              <span className="text-black">
                {services.eyebrow.split("//")[1]?.trim()}
              </span>
            </div>

            <h2 className="max-w-[460px] text-4xl font-normal leading-[1.05] tracking-[-0.04em] text-black sm:text-5xl lg:text-[52px]">
              {services.title}
            </h2>
          </div>

          {/* Right */}
          <div className="flex items-start md:justify-end">
            <p className="max-w-[530px] pt-2 text-base leading-7 text-[#555] md:pt-8">
              {services.description}
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div className="relative z-20 mt-16 flex flex-col items-center justify-center gap-5 md:flex-row">
          {serviceItems.map((service) => (
            <ServiceCard
              key={service._id ?? service.order}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  service: ServiceItem;
};

function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <article className="group relative h-[300px] w-full max-w-[300px] overflow-hidden rounded-[18px] bg-[#dce4ea] md:h-[300px] md:w-[30%]">
      {/* Image */}
      {service.image ? (
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#dce4ea] text-sm text-gray-500">
          No image available
        </div>
      )}

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-7">
        <div className="mb-3 text-[36px] font-semibold leading-none text-[#444]">
          {service.number}
        </div>

        <h3 className="text-xl font-medium text-black">
          {service.title}
        </h3>
      </div>
    </article>
  );
}