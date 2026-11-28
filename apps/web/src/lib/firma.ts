// Rapor başlığında (PDF/Excel) kullanılan firma bilgisi — yalnız cihazda (localStorage).
export interface FirmaBilgisi {
  ad: string;
  adres: string;
  telefon: string;
  eposta: string;
  logo: string; // data URL ("" = yok)
}

const ANAHTAR = "metranik.firma";
export const LOGO_AZAMI_BAYT = 200_000;

export const BOS_FIRMA: FirmaBilgisi = { ad: "", adres: "", telefon: "", eposta: "", logo: "" };

export function firmaGetir(): FirmaBilgisi {
  try {
    const ham = localStorage.getItem(ANAHTAR);
    if (!ham) return BOS_FIRMA;
    const o = JSON.parse(ham) as Partial<FirmaBilgisi>;
    const s = (v: unknown) => (typeof v === "string" ? v : "");
    const logo = s(o.logo);
    return {
      ad: s(o.ad),
      adres: s(o.adres),
      telefon: s(o.telefon),
      eposta: s(o.eposta),
      logo: logo.startsWith("data:image/") ? logo : "",
    };
  } catch {
    return BOS_FIRMA;
  }
}

export function firmaKaydet(f: FirmaBilgisi): boolean {
  try {
    localStorage.setItem(ANAHTAR, JSON.stringify(f));
    return true;
  } catch {
    return false;
  }
}

export function firmaVarMi(f: FirmaBilgisi): boolean {
  return Boolean(f.ad || f.adres || f.telefon || f.eposta || f.logo);
}

/** CSV raporunun başına eklenecek satırlar (firma yoksa boş dizi). */
export function firmaCsvSatirlari(f: FirmaBilgisi): string[][] {
  if (!firmaVarMi(f)) return [];
  const s: string[][] = [];
  if (f.ad) s.push(["Firma", f.ad]);
  if (f.adres) s.push(["Adres", f.adres]);
  if (f.telefon) s.push(["Telefon", f.telefon]);
  if (f.eposta) s.push(["E-posta", f.eposta]);
  s.push([]);
  return s;
}
