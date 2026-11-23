// İsteğe bağlı bulut yedeği (Supabase). Eşitleme otomatik değildir: kullanıcı açıkça yedekler / geri yükler.
// Geri yükleme yalnız EKLER, yerel kaydı silmez veya ezmez. Bulut tablosu: supabase/migrations/0001 + 0002.
import type { KayitliHesap } from "@/lib/projeler";

/** Supabase istemcisinin kullandığımız alt kümesi (test için taklit edilebilir). */
export interface BulutIstemcisi {
  from(tablo: string): {
    upsert(satirlar: unknown[], secenek: { onConflict: string }): PromiseLike<{ error: { message: string } | null }>;
    select(kolonlar: string): {
      order(kolon: string, secenek: { ascending: boolean }): {
        limit(n: number): PromiseLike<{ data: { veri: unknown; istemci_id: string | null }[] | null; error: { message: string } | null }>;
      };
    };
    delete(): { gte(kolon: string, deger: string): PromiseLike<{ error: { message: string } | null }> };
  };
}

const TABLO = "kayitli_hesaplar";
const PARCA = 100;

export async function bulutaYedekle(sb: BulutIstemcisi, yerel: KayitliHesap[]): Promise<number> {
  const satirlar = yerel.map((k) => ({
    istemci_id: k.id,
    proje: k.proje,
    module_id: k.moduleId,
    veri: k,
    tarih: new Date(k.tarih).toISOString(),
  }));
  for (let i = 0; i < satirlar.length; i += PARCA) {
    const { error } = await sb.from(TABLO).upsert(satirlar.slice(i, i + PARCA), { onConflict: "user_id,istemci_id" });
    if (error) throw new Error(error.message);
  }
  return satirlar.length;
}

function kayitMi(v: unknown): v is KayitliHesap {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.proje === "string" &&
    typeof o.moduleId === "string" &&
    typeof o.title === "string" &&
    typeof o.href === "string" &&
    typeof o.sonuc === "string" &&
    typeof o.tarih === "number" &&
    Array.isArray(o.girdiler) &&
    Array.isArray(o.araDegerler)
  );
}

export async function buluttanGetir(sb: BulutIstemcisi): Promise<KayitliHesap[]> {
  const { data, error } = await sb.from(TABLO).select("veri, istemci_id").order("tarih", { ascending: false }).limit(1000);
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => r.veri).filter(kayitMi);
}

/** Yereldekileri korur; yalnız yerelde olmayan bulut kayıtlarını ekler. Yeniden eskiye sıralar, en çok 500 tutar. */
export function birlestir(yerel: KayitliHesap[], bulut: KayitliHesap[]): { liste: KayitliHesap[]; eklenen: number } {
  const var_ = new Set(yerel.map((k) => k.id));
  const yeni = bulut.filter((k) => !var_.has(k.id));
  const liste = [...yerel, ...yeni].sort((a, b) => b.tarih - a.tarih).slice(0, 500);
  return { liste, eklenen: yeni.length };
}

/** Kullanıcının buluttaki tüm kayıtlarını siler (silme hakkı). RLS yalnız kendi satırlarına izin verir. */
export async function buluttakileriSil(sb: BulutIstemcisi): Promise<void> {
  const { error } = await sb.from(TABLO).delete().gte("tarih", "1970-01-01T00:00:00Z");
  if (error) throw new Error(error.message);
}
