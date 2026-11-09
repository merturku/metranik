import { describe, it, expect } from "vitest";
import { gucFaktoruIyilestirmeKayipAzalmasi } from "./guc-faktoru-iyilestirme-kayip-azalmasi";

describe("Güç Faktörü İyileştirme — Kayıp Azalması", () => {
  it("0,80 → 0,95: akım oranı 0,8421; kayıp oranı 0,7091 → %29,09 azalma; 1000 W → 709,1 W", () => {
    const r = gucFaktoruIyilestirmeKayipAzalmasi.compute({ mevcutCosPhi: 0.8, hedefCosPhi: 0.95, mevcutHatKaybi_W: 1000 });
    expect(r.intermediates.akim_orani_I2_I1 as number).toBeCloseTo(0.8421, 4);
    expect(r.value.kayipAzalmasi_yuzde).toBeCloseTo(29.09, 1);
    expect(r.intermediates.yeni_hat_kaybi_W as number).toBeCloseTo(709.1, 0);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("hedef = mevcut → azalma 0; hedef < mevcut → uygunsuz", () => {
    expect(gucFaktoruIyilestirmeKayipAzalmasi.compute({ mevcutCosPhi: 0.9, hedefCosPhi: 0.9, mevcutHatKaybi_W: 500 }).value.kayipAzalmasi_yuzde).toBeCloseTo(0, 10);
    expect(gucFaktoruIyilestirmeKayipAzalmasi.compute({ mevcutCosPhi: 0.95, hedefCosPhi: 0.8, mevcutHatKaybi_W: 500 }).verdict?.status).toBe("uygunsuz");
  });
});
