// lib/api/photoAlbums.ts

export type PhotoAlbumItem = {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  order: number;
  isActive: boolean;
};

export type PhotoAlbum = {
  _id: string;
  eyebrow: string;
  title: string;
  highlightedTitle: string;
  secondTitle: string;
  items: PhotoAlbumItem[];
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type PhotoAlbumsApiResponse = {
  success: boolean;
  message: string;
  data: PhotoAlbum | null;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3000";

export async function getPhotoAlbums(): Promise<PhotoAlbum | null> {
  try {
    const url = `${API_URL}/api/photo-albums`;

    console.log(
      "🔵 Fetching Photo Albums from:",
      url
    );

    const response = await fetch(url, {
      cache: "no-store",
    });

    console.log(
      "🔵 Photo Albums API status:",
      response.status
    );

    const result: PhotoAlbumsApiResponse =
      await response.json();

    console.log(
      "🟢 Photo Albums API response:",
      result
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(
          "⚠️ Photo Albums content not found."
        );

        return null;
      }

      console.error(
        "❌ Photo Albums API error:",
        response.status
      );

      return null;
    }

    if (!result.success) {
      console.error(
        "❌ Photo Albums API failed:",
        result.message
      );

      return null;
    }

    if (!result.data) {
      console.warn(
        "⚠️ Photo Albums data is empty."
      );

      return null;
    }

    const data = result.data;

    if (!Array.isArray(data.items)) {
      console.error(
        "❌ Photo Albums items is not an array:",
        data.items
      );

      return null;
    }

    /*
     * Only return active photos.
     * Sort them according to the admin-defined order.
     */
    const activeItems = data.items
      .filter(
        (item) => item.isActive === true
      )
      .sort(
        (a, b) => a.order - b.order
      );

    return {
      ...data,
      items: activeItems,
    };
  } catch (error) {
    console.error(
      "❌ Photo Albums fetch error:",
      error
    );

    return null;
  }
}