const ADMIN_API_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_URL ||
  "http://localhost:3000";

export type SocialLink = {
  platform: "facebook" | "instagram" | "linkedin";
  url: string;
  enabled: boolean;
};

export type HeroButton = {
  text: string;
  link: string;
  enabled: boolean;
};

export type HeroSlide = {
  _id?: string;

  eyebrow: string;

  title: string;

  description: string;

  backgroundImage: string;

  primaryButton: HeroButton;

  secondaryButton: HeroButton;

  socialLinks: SocialLink[];

  order: number;

  isActive: boolean;
};

export type Hero = {
  _id?: string;

  slides: HeroSlide[];

  isPublished: boolean;

  createdAt?: string;

  updatedAt?: string;
};

/* =========================================================
   GET HERO
========================================================= */

export async function getHero(): Promise<Hero | null> {
  try {
    const apiUrl = `${ADMIN_API_URL}/api/hero`;

    console.log(
      "🔵 Fetching Hero from:",
      apiUrl
    );

    const response = await fetch(apiUrl, {
      method: "GET",

      headers: {
        Accept: "application/json",
      },

      cache: "no-store",
    });

    console.log(
      "🔵 Hero API status:",
      response.status
    );

    /* =====================================================
       HTTP ERROR
    ===================================================== */

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "❌ Hero API HTTP error:",
        response.status,
        errorText
      );

      return null;
    }

    /* =====================================================
       PARSE RESPONSE
    ===================================================== */

    const result = await response.json();

    console.log(
      "🟢 Hero API response:",
      result
    );

    /* =====================================================
       API ERROR
    ===================================================== */

    if (!result.success) {
      console.error(
        "❌ Hero API returned success=false:",
        result.message
      );

      return null;
    }

    /* =====================================================
       VALIDATE DATA
    ===================================================== */

    if (!Array.isArray(result.data)) {
      console.error(
        "❌ Hero API data is not an array:",
        result.data
      );

      return null;
    }

    /* =====================================================
       GET ACTIVE / PUBLISHED HERO
    ===================================================== */

    const hero = result.data.find(
      (item: Hero) =>
        item.isPublished === true
    );

    if (!hero) {
      console.error(
        "❌ No published Hero found"
      );

      return null;
    }

    /* =====================================================
       VALIDATE SLIDES
    ===================================================== */

    if (!Array.isArray(hero.slides)) {
      console.error(
        "❌ Hero slides is not an array:",
        hero
      );

      return null;
    }

    if (hero.slides.length === 0) {
      console.error(
        "❌ Hero has no slides"
      );

      return null;
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    console.log(
      "✅ Hero fetched successfully:",
      hero
    );

    return hero;
  } catch (error) {
    console.error(
      "❌ Hero API request failed:",
      error
    );

    return null;
  }
}