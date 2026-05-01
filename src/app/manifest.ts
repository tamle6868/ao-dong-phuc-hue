import type { MetadataRoute } from "next";
import { BUSINESS_INFO } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS_INFO.name,
    short_name: "ADP Huế",
    description: BUSINESS_INFO.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#8b0e0e",
    lang: "vi",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
