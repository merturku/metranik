import { describe, it, expect } from "vitest";
import { tersOzmozKutleDengesi } from "./ters-ozmoz-kutle-dengesi";

describe("Ters Ozmoz Kütle Dengesi", () => {
  it("10 m³/h, R = %75, 1000 mg/L, ret %98: Qp = 7,5; Qc = 2,5; Cp = 20; Cc = 3940 mg/L; CF = 3,94", () => {
    const r = tersOzmozKutleDengesi.compute({ beslemeDebisi_m3h: 10, geriKazanim_yuzde: 75, beslemeTDS_mgL: 1000, tuzRetOrani_yuzde: 98 });
    expect(r.value.uretilenSuDebisi_m3h).toBeCloseTo(7.5, 8);
    expect(r.intermediates.urun_suyu_TDS_mgL as number).toBeCloseTo(20, 8);
    expect(r.intermediates.konsantre_TDS_mgL as number).toBeCloseTo(3940, 6);
    expect(r.intermediates.konsantrasyon_faktoru as number).toBeCloseTo(3.94, 6);
    expect(Math.abs(r.intermediates.tuz_dengesi_hatasi as number)).toBeLessThan(1e-9);
  });
  it("ret %100 ve R = %75 → CF = 1/(1 − R) = 4; R > %85 sınırda", () => {
    const r = tersOzmozKutleDengesi.compute({ beslemeDebisi_m3h: 10, geriKazanim_yuzde: 75, beslemeTDS_mgL: 500, tuzRetOrani_yuzde: 100 });
    expect(r.intermediates.konsantrasyon_faktoru as number).toBeCloseTo(4, 8);
    expect(tersOzmozKutleDengesi.compute({ beslemeDebisi_m3h: 10, geriKazanim_yuzde: 90, beslemeTDS_mgL: 500, tuzRetOrani_yuzde: 98 }).verdict?.status).toBe("sinirda");
  });
});
