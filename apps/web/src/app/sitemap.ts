import type { MetadataRoute } from "next";
import { TUM_MODULLER } from "@/lib/modules";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://metranik.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const sabit = ["/", "/uygulama", "/ifc-metraj", "/kvkk"].map((yol) => ({
    url: `${SITE}${yol}`,
    changeFrequency: "weekly" as const,
  }));
  const moduller = TUM_MODULLER.map((m) => ({
    url: `${SITE}${m.href}`,
    changeFrequency: "monthly" as const,
  }));
  return [...sabit, ...moduller];
}
