const ADMIN_API_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_URL;

export type SocialLink = {
  platform:
    | "facebook"
    | "instagram"
    | "linkedin";
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
    /* -----------------------------------------------------
       CHECK ENVIRONMENT VARIABLE
    ----------------------------------------------------- */

    if (!ADMIN_API_URL) {
      console.error(
        "❌ NEXT_PUBLIC_ADMIN_API_URL is missing"
      );

      return null;
    }

    /* -----------------------------------------------------
       BUILD API URL
    ----------------------------------------------------- */

    const apiUrl =
      `${ADMIN_API_URL}/api/hero`;

    console.log(
      "🔵 Fetching Hero from:",
      apiUrl
    );

    /* -----------------------------------------------------
       FETCH ADMIN API
    ----------------------------------------------------- */

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

    /* -----------------------------------------------------
       HANDLE HTTP ERROR
    ----------------------------------------------------- */

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "❌ Hero API HTTP error:",
        response.status,
        errorText
      );

      return null;
    }

    /* -----------------------------------------------------
       PARSE RESPONSE
    ----------------------------------------------------- */

    const result =
      await response.json();

    console.log(
      "🟢 Hero API response:",
      result
    );

    /* -----------------------------------------------------
       HANDLE API ERROR
    ----------------------------------------------------- */

    if (!result.success) {
      console.error(
        "❌ Hero API returned success=false:",
        result.message
      );

      return null;
    }

    /* -----------------------------------------------------
       VALIDATE DATA
    ----------------------------------------------------- */

    if (!result.data) {
      console.error(
        "❌ Hero API returned no data"
      );

      return null;
    }

    if (
      !Array.isArray(
        result.data.slides
      )
    ) {
      console.error(
        "❌ Hero API data.slides is not an array:",
        result.data
      );

      return null;
    }

    /* -----------------------------------------------------
       SUCCESS
    ----------------------------------------------------- */

    console.log(
      "✅ Hero fetched successfully:",
      result.data
    );

    return result.data;
  } catch (error) {
    console.error(
      "❌ Hero API request failed:",
      error
    );

    return null;
  }
}