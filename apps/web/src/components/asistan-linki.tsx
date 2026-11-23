"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Asistan yalnız sunucuda ANTHROPIC_API_KEY tanımlıysa menüde görünür.
export function AsistanLinki({ onNavigate }: { onNavigate?: () => void }) {
  const [aktif, setAktif] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    fetch("/api/asistan")
      .then((r) => r.json())
      .then((d: { aktif?: boolean }) => setAktif(!!d.aktif))
      .catch(() => setAktif(false));
  }, []);
  if (!aktif) return null;
  return (
    <Link
      href="/asistan"
      onClick={onNavigate}
      className={`rounded-lg px-3 py-2 text-body font-medium transition-colors duration-fast ${
        pathname === "/asistan" ? "bg-accent/10 text-accent-text" : "text-text-secondary hover:text-text-primary"
      }`}
    >
      AI Asistan
    </Link>
  );
}
