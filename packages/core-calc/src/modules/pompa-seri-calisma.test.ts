import { describe, it, expect } from "vitest";
import { pompaSeriCalisma } from "./pompa-seri-calisma";

const taban = { pompaA_m: 50, pompaB: 0, pompaC: -0.2, statikYuk_m: 10, sistemK: 0.05 };

describe("Pompaların Seri Çalışma", () => {
  it("2 pompa seri: −0,45 Q² + 90 = 0 → Q = √200 = 14,142 m³/h; H = 10 + 0,05·200 = 20 m (pompa başına 10 m)", () => {
    const r = pompaSeriCalisma.compute({ ...taban, pompaSayisi: 2 });
    expect(r.value.debi_m3h as number).toBeCloseTo(14.142, 3);
    expect(r.intermediates.toplam_basma_yuksekligi_m as number).toBeCloseTo(20, 6);
    expect(r.intermediates.pompa_basina_yukseklik_m as number).toBeCloseTo(10, 6);
  });
  it("tek pompa Q1 = 12,649; seri debi artışı 1,118; n = 1 → seri = tek pompa", () => {
    const r = pompaSeriCalisma.compute({ ...taban, pompaSayisi: 2 });
    expect(r.intermediates.tek_pompa_debisi_m3h as number).toBeCloseTo(12.649, 3);
    expect(r.intermediates.debi_artis_orani as number).toBeCloseTo(1.118, 3);
    expect(pompaSeriCalisma.compute({ ...taban, pompaSayisi: 1 }).value.debi_m3h as number).toBeCloseTo(12.649, 3);
  });
  it("eğri doğrulaması: n·(A + Bq + Cq²) = Hst + kq²", () => {
    const g = { pompaA_m: 40, pompaB: -1, pompaC: -0.1, statikYuk_m: 5, sistemK: 0.02, pompaSayisi: 3 };
    const r = pompaSeriCalisma.compute(g);
    const q = r.value.debi_m3h as number;
    expect(3 * (g.pompaA_m + g.pompaB * q + g.pompaC * q * q)).toBeCloseTo(g.statikYuk_m + g.sistemK * q * q, 8);
  });
  it("toplam kapalı vana yüksekliği statikten küçükse null + uygunsuz", () => {
    expect(pompaSeriCalisma.compute({ ...taban, statikYuk_m: 120, pompaSayisi: 2 }).verdict?.status).toBe("uygunsuz");
  });
});
