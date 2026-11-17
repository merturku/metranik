import { describe, it, expect } from "vitest";
import { isikSiddetiAkiAciDonusumu } from "./isik-siddeti-aki-aci-donusumu";

describe("Işık Şiddeti – Akı – Açı", () => {
  it("1000 lm, 60° koni: Ω = 0,84179 sr; I = 1187,95 cd; 3 m'de E = 131,99 lx", () => {
    const r = isikSiddetiAkiAciDonusumu.compute({ aki_lm: 1000, isinAcisi_deg: 60, mesafe_m: 3 });
    expect(r.intermediates.kati_aci_sr as number).toBeCloseTo(0.841787, 5);
    expect(r.value.isikSiddeti_cd).toBeCloseTo(1187.9487, 3);
    expect(r.intermediates.eksen_aydinligi_lx as number).toBeCloseTo(131.9943, 3);
  });
  it("360° (küre): Ω = 4π, I = Φ/4π (1000 lm → 79,577 cd)", () => {
    const r = isikSiddetiAkiAciDonusumu.compute({ aki_lm: 1000, isinAcisi_deg: 360, mesafe_m: 1 });
    expect(r.intermediates.kati_aci_sr as number).toBeCloseTo(4 * Math.PI, 8);
    expect(r.value.isikSiddeti_cd).toBeCloseTo(1000 / (4 * Math.PI), 6);
  });
});
