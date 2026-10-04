import { describe, it, expect } from "vitest";
import { boruIsiKaybiYuzeySicakligi } from "./boru-isi-kaybi-yuzey-sicakligi";

describe("Yalıtımlı Boru Yüzey Sıcaklığı", () => {
  it("80°C içeri, 20°C ortam, 50mm izolasyon → ~30°C yüzey", () => {
    const r = boruIsiKaybiYuzeySicakligi.compute({ ic_sicaklik_C: 80, ortam_sicakligi_C: 20, isolasyon_kalınligi_mm: 50 });
    expect(r.value.yuzey_sicakligi_C).toBeGreaterThan(25);
  });
});
