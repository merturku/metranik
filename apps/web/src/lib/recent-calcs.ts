const STORAGE_KEY = "metranik.recentCalcs";
const MAX_ENTRIES = 20;

export interface RecentCalc {
  moduleId: string;
  title: string;
  href: string;
  summary: string;
  timestamp: number;
}

export function recordCalc(entry: Omit<RecentCalc, "timestamp">) {
  if (typeof window === "undefined") return;
  const mevcut = getRecentCalcs();
  const guncel = [{ ...entry, timestamp: Date.now() }, ...mevcut].slice(0, MAX_ENTRIES);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(guncel));
}

export function getRecentCalcs(): RecentCalc[] {
  if (typeof window === "undefined") return [];
  try {
    const ham = window.localStorage.getItem(STORAGE_KEY);
    return ham ? (JSON.parse(ham) as RecentCalc[]) : [];
  } catch {
    return [];
  }
}

export function getEnCokKullanilanlar(limit = 5): { moduleId: string; title: string; href: string; adet: number }[] {
  const gecmis = getRecentCalcs();
  const sayac = new Map<string, { title: string; href: string; adet: number }>();
  for (const kayit of gecmis) {
    const mevcut = sayac.get(kayit.moduleId);
    if (mevcut) {
      mevcut.adet += 1;
    } else {
      sayac.set(kayit.moduleId, { title: kayit.title, href: kayit.href, adet: 1 });
    }
  }
  return Array.from(sayac.entries())
    .map(([moduleId, v]) => ({ moduleId, ...v }))
    .sort((a, b) => b.adet - a.adet)
    .slice(0, limit);
}

export function bugunSayisi(moduleId: string): number {
  const gunBaslangici = new Date();
  gunBaslangici.setHours(0, 0, 0, 0);
  return getRecentCalcs().filter(
    (k) => k.moduleId === moduleId && k.timestamp >= gunBaslangici.getTime(),
  ).length;
}
