// Kayıtlı hesaplar (Projelerim) ve favori modüller — yalnız bu cihazın localStorage'ında tutulur.
const KAYIT_KEY = "metranik.kayitlar";
const FAVORI_KEY = "metranik.favoriler";

export interface SatirDeger {
  etiket: string;
  deger: string;
}

export interface KayitliHesap {
  id: string;
  proje: string;
  moduleId: string;
  title: string;
  /** Girdileri taşıyan bağlantı: açılınca hesap yeniden yapılır. */
  href: string;
  standart: string;
  sonuc: string;
  girdiler: SatirDeger[];
  araDegerler: SatirDeger[];
  durum?: string;
  tarih: number;
}

function oku<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const ham = window.localStorage.getItem(key);
    return ham ? (JSON.parse(ham) as T[]) : [];
  } catch {
    return [];
  }
}

function yaz(key: string, v: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(v));
  } catch {
    // depolama kapalı/dolu: sessiz geç, arayüz kaydın yapılmadığını ayrıca bildirir
  }
}

export function kayitlariGetir(): KayitliHesap[] {
  return oku<KayitliHesap>(KAYIT_KEY);
}

export function hesapKaydet(k: Omit<KayitliHesap, "id" | "tarih">): boolean {
  const liste = kayitlariGetir();
  liste.unshift({ ...k, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, tarih: Date.now() });
  yaz(KAYIT_KEY, liste.slice(0, 500));
  return kayitlariGetir().length > 0;
}

export function kaydiSil(id: string) {
  yaz(KAYIT_KEY, kayitlariGetir().filter((k) => k.id !== id));
}

export function projeAdlari(): string[] {
  return [...new Set(kayitlariGetir().map((k) => k.proje))];
}

export function favorileriGetir(): string[] {
  return oku<string>(FAVORI_KEY);
}

export function favoriMi(moduleId: string): boolean {
  return favorileriGetir().includes(moduleId);
}

/** Favori durumunu tersine çevirir; yeni durumu döndürür. */
export function favoriDegistir(moduleId: string): boolean {
  const l = favorileriGetir();
  const var_ = l.includes(moduleId);
  yaz(FAVORI_KEY, var_ ? l.filter((x) => x !== moduleId) : [moduleId, ...l]);
  return !var_;
}

/** Excel'in doğrudan açtığı CSV (UTF-8 BOM, ; ayracı — Türkçe yerel ayar). */
export function csvOlustur(satirlar: string[][]): string {
  const kacis = (s: string) => `"${s.replace(/"/g, '""')}"`;
  return "﻿" + satirlar.map((r) => r.map(kacis).join(";")).join("\r\n");
}

export function dosyaIndir(ad: string, icerik: string, tip = "text/csv;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([icerik], { type: tip }));
  const a = document.createElement("a");
  a.href = url;
  a.download = ad;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Kayıtlar + favoriler tek JSON yedeği. */
export function yedekOlustur(): string {
  return JSON.stringify({ surum: 1, kayitlar: kayitlariGetir(), favoriler: favorileriGetir() }, null, 1);
}

/** Yedeği doğrular ve mevcut verinin üzerine yazar; geçersizse false döner. */
export function yedekYukle(metin: string): boolean {
  try {
    const v = JSON.parse(metin) as { surum?: number; kayitlar?: unknown; favoriler?: unknown };
    if (v.surum !== 1 || !Array.isArray(v.kayitlar) || !Array.isArray(v.favoriler)) return false;
    yaz(KAYIT_KEY, v.kayitlar);
    yaz(FAVORI_KEY, v.favoriler);
    return true;
  } catch {
    return false;
  }
}
