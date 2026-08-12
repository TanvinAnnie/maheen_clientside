export interface ServiceItem {
  _id?: string;
  number: string;
  title: string;
  image: string;
  order: number;
  isActive: boolean;
}

export interface ServicesData {
  _id?: string;
  eyebrow: string;
  title: string;
  description: string;
  items: ServiceItem[];
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ServicesApiResponse {
  success: boolean;
  message: string;
  data: ServicesData | ServicesData[] | null;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getServices(): Promise<ServicesData | null> {
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

    const result: ServicesApiResponse = await response.json();

    console.log(
      "🟢 Services API response:",
      result
    );

    if (!result.success) {
      console.error(
        "❌ Services API returned success=false:",
        result.message
      );

      return null;
    }

    if (!result.data) {
      console.error(
        "❌ Services API returned empty data"
      );

      return null;
    }

    /*
     * The backend can return:
     *
     * data: {...}
     *
     * OR
     *
     * data: [{...}]
     */

    const servicesData = Array.isArray(result.data)
      ? result.data[0]
      : result.data;

    if (!servicesData) {
      console.error(
        "❌ Services data not found"
      );

      return null;
    }

    /*
     * Validate the actual backend structure.
     *
     * Backend uses:
     * items: [...]
     */

    if (!Array.isArray(servicesData.items)) {
      console.error(
        "❌ Services data.items is not an array:",
        servicesData
      );

      return null;
    }

    /*
     * Normalize service items
     */

    const normalizedItems: ServiceItem[] =
      servicesData.items
        .filter((item) => item && item.isActive)
        .sort((a, b) => a.order - b.order)
        .map((item, index) => ({
          _id: item._id,

          number:
            typeof item.number === "string"
              ? item.number
              : String(index + 1).padStart(2, "0"),

          title:
            typeof item.title === "string"
              ? item.title
              : "",

          image:
            typeof item.image === "string"
              ? item.image
              : "",

          order:
            typeof item.order === "number"
              ? item.order
              : index + 1,

          isActive:
            typeof item.isActive === "boolean"
              ? item.isActive
              : true,
        }));

    /*
     * Final normalized Services object
     */

    const finalServices: ServicesData = {
      _id: servicesData._id,

      eyebrow:
        typeof servicesData.eyebrow === "string"
          ? servicesData.eyebrow
          : "01 // SERVICES",

      title:
        typeof servicesData.title === "string"
          ? servicesData.title
          : "Our Core Services",

      description:
        typeof servicesData.description === "string"
          ? servicesData.description
          : "",

      items: normalizedItems,

      isPublished:
        typeof servicesData.isPublished === "boolean"
          ? servicesData.isPublished
          : true,

      createdAt: servicesData.createdAt,

      updatedAt: servicesData.updatedAt,
    };

    console.log(
      "✅ Services normalized successfully:",
      finalServices
    );

    return finalServices;
  } catch (error) {
    console.error(
      "❌ Failed to fetch Services:",
      error
    );

    return null;
  }
}