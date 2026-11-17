import { describe, it, expect } from "vitest";
import { pompaSahaVerimTesti } from "./pompa-saha-verim-testi";

const g = { q_m3h: 100, h_m: 30, elektrikGucu_kW: 11, motorVerimi: 0.9, garantiVerimi: 0.82, tolerans: 0.05, yogunluk_kgm3: 1000 };

describe("Pompa Saha Verim Testi", () => {
  it("100 m³/h, 30 m, 11 kW, ηm 0,9: Phid = 8,1722 kW, Pmil = 9,9 kW, η = 0,82548", () => {
    const r = pompaSahaVerimTesti.compute(g);
    expect(r.intermediates.hidrolik_guc_kW as number).toBeCloseTo(8.172208, 5);
    expect(r.intermediates.mil_gucu_kW as number).toBeCloseTo(9.9, 8);
    expect(r.value.pompaVerimi).toBeCloseTo(0.825476, 5);
    expect(r.intermediates.toplam_verim as number).toBeCloseTo(0.742928, 5);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("garanti 0,90: alt sınır 0,855 > 0,8255 ama 0,81 üstünde → sınırda; garanti 1,0 → uygunsuz", () => {
    expect(pompaSahaVerimTesti.compute({ ...g, garantiVerimi: 0.9 }).verdict?.status).toBe("sinirda");
    expect(pompaSahaVerimTesti.compute({ ...g, garantiVerimi: 1 }).verdict?.status).toBe("uygunsuz");
  });
  it("η > 1 ölçüm hatası → uygunsuz", () => {
    expect(pompaSahaVerimTesti.compute({ ...g, elektrikGucu_kW: 5 }).verdict?.status).toBe("uygunsuz");
  });
});
