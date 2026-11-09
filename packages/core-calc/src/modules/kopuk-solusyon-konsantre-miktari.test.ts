import { describe, it, expect } from "vitest";
import { kopukSolusyonKonsantreMiktari } from "./kopuk-solusyon-konsantre-miktari";

const g = { korunanAlan_m2: 100, uygulamaYogunlugu_Ldkm2: 4.1, uygulamaSuresi_dk: 20, konsantrasyon_yuzde: 3, yedekCarpani: 1 };

describe("Köpük Solüsyon ve Konsantre", () => {
  it("100 m² × 4,1 = 410 L/dk; 20 dk → 8200 L; %3 → 246 L konsantre; su 7954 L", () => {
    const r = kopukSolusyonKonsantreMiktari.compute(g);
    expect(r.intermediates.solusyon_debisi_Ldk as number).toBeCloseTo(410, 8);
    expect(r.intermediates.toplam_solusyon_L as number).toBeCloseTo(8200, 6);
    expect(r.value.konsantreMiktari_L).toBeCloseTo(246, 6);
    expect(r.intermediates.su_ihtiyaci_L as number).toBeCloseTo(7954, 6);
  });
  it("yedek çarpanı 2 → konsantre iki katı; konsantre + su = solüsyon", () => {
    const r = kopukSolusyonKonsantreMiktari.compute({ ...g, yedekCarpani: 2 });
    expect(r.value.konsantreMiktari_L).toBeCloseTo(492, 6);
    expect((r.intermediates.konsantre_tek_seferlik_L as number) + (r.intermediates.su_ihtiyaci_L as number)).toBeCloseTo(8200, 6);
  });
});
