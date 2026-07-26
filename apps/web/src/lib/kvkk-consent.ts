const STORAGE_KEY = "metranik.kvkkConsent";

export type KvkkConsent = "full" | "essential-only";

export function getKvkkConsent(): KvkkConsent | null {
  if (typeof window === "undefined") return null;
  const ham = window.localStorage.getItem(STORAGE_KEY);
  return ham === "full" || ham === "essential-only" ? ham : null;
}

export function setKvkkConsent(consent: KvkkConsent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, consent);
}
