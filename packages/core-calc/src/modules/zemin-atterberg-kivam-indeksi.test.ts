import { describe, it, expect } from "vitest";
import { zeminAtterbergKivamIndeksi } from "./zemin-atterberg-kivam-indeksi";

describe("Atterberg Plastisite ve Kıvam İndeksi", () => {
  it("LL = 45, PL = 22, w = 30: PI = 23 (yüksek plastisiteli), LI = 0,348, CI = 0,652", () => {
    const r = zeminAtterbergKivamIndeksi.compute({ likitLimit_LL: 45, plastikLimit_PL: 22, dogalSuIcerigi_w: 30 });
    expect(r.value.plastisiteIndeksi_PI).toBe(23);
    expect(r.intermediates.likidite_indeksi_LI as number).toBeCloseTo(0.3478, 4);
    expect(r.intermediates.kivam_indeksi_CI as number).toBeCloseTo(0.6522, 4);
    expect(r.intermediates.plastisite_derecesi).toBe("yüksek plastisiteli");
    expect(r.verdict?.status).toBe("uygun");
  });
  it("w > LL → LI > 1 akıcı, uygunsuz; w < PL → katı", () => {
    const a = zeminAtterbergKivamIndeksi.compute({ likitLimit_LL: 45, plastikLimit_PL: 22, dogalSuIcerigi_w: 50 });
    expect(a.verdict?.status).toBe("uygunsuz");
    expect(a.intermediates.kivam_durumu).toBe("akıcı (LL üstü)");
    expect(zeminAtterbergKivamIndeksi.compute({ likitLimit_LL: 45, plastikLimit_PL: 22, dogalSuIcerigi_w: 18 }).intermediates.kivam_durumu).toBe("katı (PL altı)");
  });
  it("LL ≤ PL → NP uyarısı", () => {
    expect(zeminAtterbergKivamIndeksi.compute({ likitLimit_LL: 20, plastikLimit_PL: 22, dogalSuIcerigi_w: 15 }).verdict?.status).toBe("sinirda");
  });
});
