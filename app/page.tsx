import Hero from "@/components/home/Hero";
import { getHero } from "@/lib/api/hero";

export default async function Home() {
  const hero = await getHero();

  if (!hero) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Hero content is unavailable
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please check the Admin Hero section.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Hero hero={hero} />
    </main>
  );
}