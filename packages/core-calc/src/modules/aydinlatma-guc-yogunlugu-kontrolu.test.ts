import { describe, expect, it } from "vitest";
import { aydinlatmaGucYogunluguKontrolu } from "./aydinlatma-guc-yogunlugu-kontrolu";

describe("aydinlatma-guc-yogunlugu-kontrolu", () => {
  it("1800 W / 200 m² = 9 W/m², sınır 10 W/m² → uygun", () => {
    const r = aydinlatmaGucYogunluguKontrolu.compute({
      toplamAydinlatmaGucu_W: 1800,
      alan_m2: 200,
      izinVerilenLPD_Wm2: 10,
    });

    expect(r.value.hesaplananLPD_Wm2).toBeCloseTo(9, 5);
    expect(r.verdict?.status).toBe("uygun");
  });
});
