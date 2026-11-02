import { describe, it, expect } from "vitest";
import { asiriAkimRoleAcmaSuresi } from "./asiri-akim-role-acma-suresi";

describe("Ters Zamanlı Röle Açma Süresi", () => {
  const o = { egri: "si" as const, arizaAkimi_A: 1000, baslamaAkimi_A: 100, zamanCarpani: 0.5 };
  it("SI, I/Is = 10, TMS 0,5 → 0,5·0,14/(10^0,02 − 1) ≈ 1,485 s", () => {
    expect(asiriAkimRoleAcmaSuresi.compute(o).value.acmaSuresi_s).toBeCloseTo(1.4854, 3);
  });
  it("VI: 13,5/(10−1) = 1,5 s (TMS 1); EI: 80/(100−1) = 0,808 s", () => {
    expect(asiriAkimRoleAcmaSuresi.compute({ ...o, egri: "vi", zamanCarpani: 1 }).value.acmaSuresi_s).toBeCloseTo(1.5, 9);
    expect(asiriAkimRoleAcmaSuresi.compute({ ...o, egri: "ei", zamanCarpani: 1 }).value.acmaSuresi_s).toBeCloseTo(0.8081, 4);
  });
  it("I ≤ Is → null ve uygunsuz", () => {
    const r = asiriAkimRoleAcmaSuresi.compute({ ...o, arizaAkimi_A: 90 });
    expect(r.value.acmaSuresi_s).toBeNull();
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
