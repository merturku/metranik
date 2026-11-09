import { describe, it, expect } from "vitest";
import { evHavuzHacmiDolumSuresi } from "./ev-havuz-hacmi-dolum-suresi";

describe("Havuz Hacmi ve Dolum Süresi", () => {
  it("dikdörtgen 5 × 3 × 1,2 m = 18 m³; 100 L/dk → 180 dk = 3 saat", () => {
    const r = evHavuzHacmiDolumSuresi.compute({ sekil: "dikdortgen", boyut1_m: 5, boyut2_m: 3, derinlik_m: 1.2, dolumDebisi_Ldk: 100 });
    expect(r.value.hacim_m3).toBeCloseTo(18, 8);
    expect(r.intermediates.dolum_suresi_saat as number).toBeCloseTo(3, 8);
  });
  it("daire Ø3,66 m, 0,9 m: V = 9,4688 m³; 30 L/dk → 315,6 dk (5,26 saat)", () => {
    const r = evHavuzHacmiDolumSuresi.compute({ sekil: "daire", boyut1_m: 3.66, boyut2_m: 0, derinlik_m: 0.9, dolumDebisi_Ldk: 30 });
    expect(r.value.hacim_m3).toBeCloseTo(9.4688, 3);
    expect(r.intermediates.dolum_suresi_dakika as number).toBeCloseTo(315.63, 1);
  });
  it("dikdörtgende en 0 uygunsuz", () => {
    expect(evHavuzHacmiDolumSuresi.compute({ sekil: "dikdortgen", boyut1_m: 5, boyut2_m: 0, derinlik_m: 1, dolumDebisi_Ldk: 100 }).verdict?.status).toBe("uygunsuz");
  });
});
