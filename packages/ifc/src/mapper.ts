/**
 * Metraj gruplarını CalcModule girdilerine eşler.
 * Yalnız IFC'den gerçekten okunan değerler aktarılır; debi, akım, sürtünme katsayısı gibi
 * tasarım girdileri kullanıcıya bırakılır (uydurma tahmin yok).
 */
import type { IfcMetrajSonucu, ModulOnerisi, MetrajGrubu } from "./types";

export interface EslemeKurali {
  kategori: MetrajGrubu["kategori"];
  moduleId: string;
  /** Üretilen girdi anahtarları (modül şemasıyla birebir aynı olmalı) */
  anahtarlar: string[];
}

export const ESLEME_KURALLARI: EslemeKurali[] = [
  { kategori: "boru", moduleId: "boru-basinc-kaybi", anahtarlar: ["uzunluk", "capD"] },
  { kategori: "kanal", moduleId: "kanal-sac-agirligi", anahtarlar: ["genislik_mm", "yukseklik_mm", "uzunluk_m"] },
  { kategori: "kablo", moduleId: "kablo-kesiti-iec60364", anahtarlar: ["uzunluk_m"] },
];

export function modullereEsle(sonuc: IfcMetrajSonucu): ModulOnerisi[] {
  const oneriler: ModulOnerisi[] = [];
  for (const g of sonuc.gruplar) {
    const kaynakGrup = `${g.ifcSinifi} ${g.etiket}`;
    if (g.kategori === "boru" && g.disCap_mm !== undefined && g.toplamUzunluk_m > 0) {
      oneriler.push({
        moduleId: "boru-basinc-kaybi",
        girdiler: { uzunluk: g.toplamUzunluk_m, capD: g.disCap_mm / 1000 },
        guven: "orta",
        kaynakGrup,
        notlar: [
          "Çap IFC'deki dış çaptır; modül iç çap ister — iç çapı kendiniz girin.",
          "Toplam uzunluk alınmıştır; basınç kaybı kritik devre uzunluğuyla hesaplanmalıdır.",
          "Debi ve sürtünme katsayısı IFC'de yoktur, siz girin.",
        ],
      });
    }
    if (g.kategori === "kanal" && g.genislik_mm !== undefined && g.yukseklik_mm !== undefined && g.toplamUzunluk_m > 0) {
      oneriler.push({
        moduleId: "kanal-sac-agirligi",
        girdiler: { genislik_mm: g.genislik_mm, yukseklik_mm: g.yukseklik_mm, uzunluk_m: g.toplamUzunluk_m },
        guven: "yuksek",
        kaynakGrup,
        notlar: ["Sac kalınlığı ve fire oranını siz girin."],
      });
    }
    if (g.kategori === "kablo" && g.enUzunEleman_m > 0) {
      oneriler.push({
        moduleId: "kablo-kesiti-iec60364",
        girdiler: { uzunluk_m: g.enUzunEleman_m },
        guven: "dusuk",
        kaynakGrup,
        notlar: [
          "IFC kablo segmenti bir devre olmayabilir; en uzun segment uzunluğu alınmıştır, gerçek devre boyunu girin.",
          "Akım ve izin verilen gerilim düşümü IFC'de yoktur.",
        ],
      });
    }
  }
  return oneriler;
}

/** Modül sayfasına hazır girdili bağlantı (paylaşım bağlantısı biçimi) */
export function oneriBaglantisi(o: ModulOnerisi): string {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(o.girdiler)) q.set(k, String(v));
  return `/${o.moduleId}?${q.toString()}`;
}
