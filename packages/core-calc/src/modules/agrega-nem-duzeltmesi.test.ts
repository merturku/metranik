import { describe, it, expect } from "vitest";
import { agregaNemDuzeltmesi } from "./agrega-nem-duzeltmesi";

const g = { tasarimSuyu_kgm3: 180, ince_kuru_kgm3: 800, ince_nem_yuzde: 4, ince_emme_yuzde: 1.5, iri_kuru_kgm3: 1000, iri_nem_yuzde: 1, iri_emme_yuzde: 0.8 };

describe("Agrega Nem Düzeltmesi", () => {
  it("kum 800 kg (nem %4, emme %1,5) → 20 kg; çakıl 1000 kg (%1, %0,8) → 2 kg; su 180 − 22 = 158 kg/m³", () => {
    const r = agregaNemDuzeltmesi.compute(g);
    expect(r.intermediates.ince_serbest_su_kgm3 as number).toBeCloseTo(20, 8);
    expect(r.intermediates.iri_serbest_su_kgm3 as number).toBeCloseTo(2, 8);
    expect(r.value.eklenecekSu_kgm3).toBeCloseTo(158, 8);
    expect(r.intermediates.tartilacak_ince_kgm3 as number).toBeCloseTo(832, 8);
    expect(r.intermediates.tartilacak_iri_kgm3 as number).toBeCloseTo(1010, 8);
  });
  it("agrega emmeden kuruysa (w < emme) su artar; aşırı nemde negatif su uygunsuz", () => {
    const kuru = agregaNemDuzeltmesi.compute({ ...g, ince_nem_yuzde: 0, iri_nem_yuzde: 0 });
    expect(kuru.value.eklenecekSu_kgm3).toBeCloseTo(180 + 800 * 0.015 + 1000 * 0.008, 8);
    expect(agregaNemDuzeltmesi.compute({ ...g, tasarimSuyu_kgm3: 10 }).verdict?.status).toBe("uygunsuz");
  });
});
