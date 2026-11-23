/**
 * IFC metraj çıkarımı tipleri
 */

export type IfcKategori = "boru" | "kanal" | "kablo" | "tava" | "ekipman";

export interface IfcEleman {
  expressId: number;
  ifcSinifi: string;
  kategori: IfcKategori;
  ad: string;
  /** Metre cinsinden uzunluk (IFC'de yoksa tanımsız — uydurulmaz) */
  uzunluk_m?: number;
  /** Dış çap (mm) */
  disCap_mm?: number;
  /** Okunan çap değerinin IFC'deki özellik adı (şeffaflık) */
  capOzellikAdi?: string;
  genislik_mm?: number;
  yukseklik_mm?: number;
}

export interface MetrajGrubu {
  kategori: IfcKategori;
  ifcSinifi: string;
  /** "Ø114.3 mm", "300×200 mm" ya da "—" (boyut bilgisi yok) */
  etiket: string;
  disCap_mm?: number;
  genislik_mm?: number;
  yukseklik_mm?: number;
  adet: number;
  /** Uzunluğu bulunan elemanların toplam uzunluğu (m) */
  toplamUzunluk_m: number;
  enUzunEleman_m: number;
  uzunluguOlmayanAdet: number;
}

export interface IfcMetrajSonucu {
  /** 1 IFC uzunluk birimi = kaç metre */
  uzunlukBirimi_m: number;
  uyarilar: string[];
  elemanlar: IfcEleman[];
  gruplar: MetrajGrubu[];
}

export interface ModulOnerisi {
  moduleId: string;
  /** Modül sayfasının alan anahtarlarıyla birebir aynı */
  girdiler: Record<string, number>;
  guven: "yuksek" | "orta" | "dusuk";
  kaynakGrup: string;
  notlar: string[];
}
