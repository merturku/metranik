import { describe, it, expect } from "vitest";
import { kolonEtriyeSarilmaDonatisi } from "./kolon-etriye-sarilma-donatisi";

const g = { etriyeAraligi_s_mm: 100, cekirdekBoyutu_bk_mm: 400, brutAlan_Ac_mm2: 250000, cekirdekAlani_Ack_mm2: 193600, fck_MPa: 30, fywk_MPa: 420, mevcutAsh_mm2: 300 };

describe("Kolon Sarılma Bölgesi Etriye Alanı", () => {
  it("s = 100, bk = 400, fck/fywk = 0,07143, Ac/Ack = 1,2913: Ash(1) = 249,7; Ash(2) = 214,3 mm² → 249,7", () => {
    const r = kolonEtriyeSarilmaDonatisi.compute(g);
    expect(r.intermediates.birinci_kosul_Ash_mm2 as number).toBeCloseTo(249.7, 0);
    expect(r.intermediates.ikinci_kosul_Ash_mm2 as number).toBeCloseTo(214.29, 1);
    expect(r.value.gerekliAsh_mm2).toBeCloseTo(249.7, 0);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("mevcut 200 mm² yetersiz → uygunsuz; Ac ≈ Ack olunca ikinci koşul belirleyici", () => {
    expect(kolonEtriyeSarilmaDonatisi.compute({ ...g, mevcutAsh_mm2: 200 }).verdict?.status).toBe("uygunsuz");
    const r = kolonEtriyeSarilmaDonatisi.compute({ ...g, cekirdekAlani_Ack_mm2: 240000 });
    expect(r.value.gerekliAsh_mm2).toBeCloseTo(214.29, 1);
  });
  it("Ack > Ac geçersiz girdi uygunsuz", () => {
    expect(kolonEtriyeSarilmaDonatisi.compute({ ...g, cekirdekAlani_Ack_mm2: 300000 }).verdict?.status).toBe("uygunsuz");
  });
});
