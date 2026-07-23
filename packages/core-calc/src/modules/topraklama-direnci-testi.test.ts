import { describe, expect, it } from "vitest";
import { topraklamaDirenciTesti } from "./topraklama-direnci-testi";

describe("topraklama-direnci-testi", () => {
  // 30 mA RCD (0.03 A), ölçülen direnç 1000 Ω → dokunma gerilimi = 1000×0.03 = 30V ≤ 50V → uygun.
  it("30 mA RCD ve 1000 Ω direnç için dokunma gerilimini hesaplar (uygun)", () => {
    const r = topraklamaDirenciTesti.compute({
      olculenDirenc_ohm: 1000,
      rcdAnmaAkimi_A: 0.03,
      izinVerilenGerilim_V: 50,
    });

    expect(r.value.dokunmaGerilimi_V).toBeCloseTo(30, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("direnç çok yüksekse izin verilen gerilimi aşar (uygunsuz)", () => {
    const r = topraklamaDirenciTesti.compute({
      olculenDirenc_ohm: 2000,
      rcdAnmaAkimi_A: 0.03,
      izinVerilenGerilim_V: 50,
    });

    expect(r.value.dokunmaGerilimi_V).toBeCloseTo(60, 5);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
