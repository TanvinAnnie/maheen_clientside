import { getHero } from "@/lib/api/hero";
import { getServices } from "@/lib/api/services";
import { getPhotoAlbums } from "@/lib/api/photoAlbums";

import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import PhotoAlbums from "@/components/home/PhotoAlbums";

export default async function Home() {
  const [hero, services, photoAlbums] =
    await Promise.all([
      getHero(),
      getServices(),
      getPhotoAlbums(),
    ]);

  return (
    <main className="w-full">
      <Hero hero={hero} />

      <Services services={services} />

      <PhotoAlbums photoAlbums={photoAlbums} />
    </main>
  );
}