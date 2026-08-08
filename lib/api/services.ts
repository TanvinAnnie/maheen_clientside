// ============================================================
// SERVICE TYPES
// ============================================================

export type ServiceItem = {
  _id?: string;
  number: string;
  title: string;
  image: string;
  order: number;
  isActive: boolean;
};

export type Services = {
  _id?: string;
  eyebrow: string;
  title: string;
  description: string;
  items: ServiceItem[];
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type ServicesApiResponse = {
  success: boolean;
  message: string;
  data: Services | null;
};

// ============================================================
// API URL
// ============================================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ============================================================
// GET SERVICES
// ============================================================

export async function getServices(): Promise<Services | null> {
  try {
    const url = `${API_URL}/api/services`;

    console.log("🔵 Fetching Services from:", url);

    const response = await fetch(url, {
      cache: "no-store",
    });

    console.log("🔵 Services API status:", response.status);

    if (!response.ok) {
      console.error(
        "❌ Services API error:",
        response.status
      );

      return null;
    }

    const result: ServicesApiResponse =
      await response.json();

    console.log("🟢 Services API response:", result);

    if (!result.success || !result.data) {
      console.error(
        "❌ Services API returned invalid data:",
        result
      );

      return null;
    }

    // --------------------------------------------------------
    // Validate items
    // --------------------------------------------------------

    if (!Array.isArray(result.data.items)) {
      console.error(
        "❌ Services API data.items is not an array:",
        result.data.items
      );

      return null;
    }

    // --------------------------------------------------------
    // Only active items
    // --------------------------------------------------------

    const activeItems = result.data.items
      .filter((item) => item.isActive)
      .sort((a, b) => a.order - b.order);

    return {
      ...result.data,
      items: activeItems,
    };
  } catch (error) {
    console.error(
      "❌ Failed to fetch Services:",
      error
    );

    return null;
  }
}