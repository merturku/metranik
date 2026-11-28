import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { REHBERLER, rehberBul } from "@/lib/rehberler";
import { modulHesapla } from "@/lib/asistan/kayit";

export function generateStaticParams() {
  return REHBERLER.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const r = rehberBul(slug);
  if (!r) return {};
  return { title: `${r.baslik} — Metranik`, description: r.ozet };
}

export default async function RehberSayfasi({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = rehberBul(slug);
  if (!r) notFound();

  const hesap = modulHesapla(r.modulId, r.ornekGirdi);
  if ("hata" in hesap) throw new Error(`Rehber örneği hesaplanamadı (${r.modulId}): ${hesap.hata}`);
  const { kayit } = hesap;
  const sonuc = (kayit.sonuc as Record<string, number | null>)[r.sonucAnahtari];
  const sonucMetni = typeof sonuc === "number" ? sonuc.toLocaleString("tr-TR", { maximumFractionDigits: r.ondalik, minimumFractionDigits: r.ondalik }) : "—";

  return (
    <article className="mx-auto max-w-[720px] px-6 py-16">
      <p className="text-xs text-text-tertiary">
        <Link href="/rehber" className="hover:text-text-primary">Hesap Rehberleri</Link>
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-text-primary">{r.baslik}</h1>
      <p className="mt-2 text-sm text-text-secondary">{r.ozet}</p>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-text-primary">Formül</h2>
        <p className="mt-2 border border-border p-3 font-mono text-sm text-text-primary">{r.formul}</p>
      </section>

      {r.bolumler.map((b) => (
        <section key={b.baslik} className="mt-8">
          <h2 className="text-base font-semibold text-text-primary">{b.baslik}</h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{b.metin}</p>
        </section>
      ))}

      <section className="mt-8">
        <h2 className="text-base font-semibold text-text-primary">Çözümlü örnek</h2>
        <table className="mt-2 w-full border border-border text-sm">
          <tbody>
            {Object.entries(r.ornekGirdi).map(([k, v]) => (
              <tr key={k} className="border-b border-border">
                <td className="p-2 text-text-secondary">{r.girdiEtiketleri[k] ?? k}</td>
                <td className="p-2 text-right text-text-primary">{String(v)}</td>
              </tr>
            ))}
            <tr>
              <td className="p-2 font-semibold text-text-primary">{r.sonucEtiketi}</td>
              <td className="p-2 text-right font-semibold text-accent-text">
                {sonucMetni} {r.birim}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-sm">
          <Link href={kayit.href} className="text-accent-text hover:underline">
            Bu örneği hesap modülünde aç ve değerleri değiştir →
          </Link>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-semibold text-text-primary">Dikkat edilecekler</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-text-secondary">
          {r.dikkat.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>

      <p className="mt-10 border-t border-border pt-4 text-xs text-text-tertiary">
        Ön boyutlandırmadır; nihai karar mühendis kontrolü gerektirir.
      </p>
    </article>
  );
}
