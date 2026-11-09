import { describe, it, expect } from "vitest";
import { engellenmisIsilGerilme } from "./engellenmis-isil-gerilme";

const g = { elastisiteModulu_MPa: 210000, genlesmeKatsayisi_1e6: 12, sicaklikFarki_K: 40, kesitAlani_mm2: 1000, akmaDayanimi_MPa: 235 };

describe("Engellenmiş Isıl Gerilme", () => {
  it("çelik, ΔT = 40 K: σ = 210000·12e-6·40 = 100,8 MPa, F = 100,8 kN", () => {
    const r = engellenmisIsilGerilme.compute(g);
    expect(r.value.gerilme_MPa).toBeCloseTo(100.8, 6);
    expect(r.intermediates.eksenel_kuvvet_kN as number).toBeCloseTo(100.8, 6);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("soğumada çekme, ısınmada basınç; işaret simetrik", () => {
    const r = engellenmisIsilGerilme.compute({ ...g, sicaklikFarki_K: -40 });
    expect(r.value.gerilme_MPa).toBeCloseTo(-100.8, 6);
  });
  it("akma sınırı: ΔT = 100 K → 252 MPa > 235 → uygunsuz; 70 K → 176,4 (0,75) → sınırda", () => {
    expect(engellenmisIsilGerilme.compute({ ...g, sicaklikFarki_K: 100 }).verdict?.status).toBe("uygunsuz");
    expect(engellenmisIsilGerilme.compute({ ...g, sicaklikFarki_K: 70 }).verdict?.status).toBe("sinirda");
  });
});
