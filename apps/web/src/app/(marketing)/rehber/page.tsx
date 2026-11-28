import type { Metadata } from "next";
import Link from "next/link";
import { REHBERLER } from "@/lib/rehberler";

export const metadata: Metadata = {
  title: "Hesap Rehberleri — Metranik",
  description:
    "Kablo kesiti, klima BTU, GES kapasitesi gibi yaygın mühendislik hesaplarının formülü, adımları ve çözümlü örneği.",
};

export default function RehberlerPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="text-2xl font-bold tracking-tight text-text-primary">Hesap Rehberleri</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Her rehberdeki çözümlü örnek, sayfa oluşturulurken Metranik hesap motoruyla hesaplanır.
      </p>
      <ul className="mt-8 space-y-4">
        {REHBERLER.map((r) => (
          <li key={r.slug} className="border border-border p-4">
            <Link href={`/rehber/${r.slug}`} className="text-base font-semibold text-text-primary hover:text-accent-text">
              {r.baslik}
            </Link>
            <p className="mt-1 text-sm text-text-secondary">{r.ozet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
