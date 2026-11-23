import { describe, it, expect } from "vitest";
import { catlakYontemiInfiltrasyon } from "./catlak-yontemi-infiltrasyon";

const g = { catlakKatsayisi_C: 0.5, akisUsteli_n: 0.65, catlakUzunlugu_m: 10, ruzgarHizi_m_s: 5, basincKatsayisiFarki: 1, icDisSicaklikFarki_K: 20 };

describe("Çatlak Yöntemi Infiltrasyon", () => {
  it("v 5 m/s, ΔCp 1 → ΔP = 15 Pa; Q = 0,5·10·15^0,65", () => {
    const r = catlakYontemiInfiltrasyon.compute(g);
    expect(r.intermediates.basinc_farki_Pa as number).toBeCloseTo(15, 10);
    expect(r.value.sizintiDebisi_m3h).toBeCloseTo(5 * 15 ** 0.65, 8);
    expect(r.intermediates.duyulur_isi_kaybi_kW as number).toBeCloseTo((1.2 * 1.005 * (5 * 15 ** 0.65) / 3600) * 20, 8);
  });
  it("n = 1'de debi basınç farkıyla (yani v²) doğrusal; rüzgâr yoksa debi 0", () => {
    const a = catlakYontemiInfiltrasyon.compute({ ...g, akisUsteli_n: 1 }).value.sizintiDebisi_m3h;
    const b = catlakYontemiInfiltrasyon.compute({ ...g, akisUsteli_n: 1, ruzgarHizi_m_s: 10 }).value.sizintiDebisi_m3h;
    expect(b / a).toBeCloseTo(4, 10);
    expect(catlakYontemiInfiltrasyon.compute({ ...g, ruzgarHizi_m_s: 0 }).value.sizintiDebisi_m3h).toBe(0);
  });
});
