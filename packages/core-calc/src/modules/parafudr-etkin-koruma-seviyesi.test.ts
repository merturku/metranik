import { describe, it, expect } from "vitest";
import { parafudrEtkinKorumaSeviyesi } from "./parafudr-etkin-koruma-seviyesi";

const g = { spdKorumaSeviyesiUp_kV: 1.5, baglantiUzunlugu_m: 0.5, iletkenInduktansi_uH_m: 1, akimDegisimHizi_kA_us: 1, ekipmanDayanimUw_kV: 4 };

describe("SPD Etkin Koruma Seviyesi", () => {
  it("Up 1,5 + 1 µH/m·0,5 m·1 kA/µs = 0,5 kV → Ueff 2,0 kV; Uw 4 kV → uygun", () => {
    const r = parafudrEtkinKorumaSeviyesi.compute(g);
    expect(r.value.etkinKorumaSeviyesi_kV).toBeCloseTo(2, 10);
    expect(r.intermediates.azami_baglanti_uzunlugu_m as number).toBeCloseTo(1.7, 10);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("Uw 2,5 → 0,8Uw = 2,0 tam sınırda uygun; Uw 2,4 → sınırda; Uw 1,8 → uygunsuz", () => {
    expect(parafudrEtkinKorumaSeviyesi.compute({ ...g, ekipmanDayanimUw_kV: 2.5 }).verdict?.status).toBe("uygun");
    expect(parafudrEtkinKorumaSeviyesi.compute({ ...g, ekipmanDayanimUw_kV: 2.4 }).verdict?.status).toBe("sinirda");
    expect(parafudrEtkinKorumaSeviyesi.compute({ ...g, ekipmanDayanimUw_kV: 1.8 }).verdict?.status).toBe("uygunsuz");
  });
});
