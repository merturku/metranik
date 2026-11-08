import { describe, it, expect } from "vitest";
import { pompaParalelCalisma } from "./pompa-paralel-calisma";

const taban = { pompaA_m: 50, pompaB: 0, pompaC: -0.2, statikYuk_m: 10, sistemK: 0.05 };

describe("Pompaların Paralel Çalışma Debisi", () => {
  it("tek pompa: −0,25 q² + 40 = 0 → q = √160 = 12,649 m³/h", () => {
    const r = pompaParalelCalisma.compute({ ...taban, pompaSayisi: 1 });
    expect(r.value.toplamDebi_m3h as number).toBeCloseTo(12.649, 3);
  });
  it("iki pompa paralel: q = 10, Q = 20 m³/h, H = 10 + 0,05·400 = 30 m (pompa eğrisi 50 − 0,2·100 = 30)", () => {
    const r = pompaParalelCalisma.compute({ ...taban, pompaSayisi: 2 });
    expect(r.value.toplamDebi_m3h as number).toBeCloseTo(20, 6);
    expect(r.intermediates.calisma_basma_yuksekligi_m as number).toBeCloseTo(30, 6);
    expect(r.intermediates.debi_artis_orani as number).toBeCloseTo(1.581, 3);
  });
  it("doğrusal terimli eğri: kök iki eğriyi de sağlar", () => {
    const g = { pompaA_m: 40, pompaB: -1, pompaC: -0.1, statikYuk_m: 5, sistemK: 0.02, pompaSayisi: 3 };
    const r = pompaParalelCalisma.compute(g);
    const q = r.intermediates.pompa_basina_debi_m3h as number;
    const Hpompa = g.pompaA_m + g.pompaB * q + g.pompaC * q * q;
    const Hsis = g.statikYuk_m + g.sistemK * (3 * q) ** 2;
    expect(Hpompa).toBeCloseTo(Hsis, 8);
  });
  it("kapalı vana yüksekliği statik yükten küçükse null + uygunsuz", () => {
    const r = pompaParalelCalisma.compute({ ...taban, statikYuk_m: 60, pompaSayisi: 2 });
    expect(r.value.toplamDebi_m3h).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
