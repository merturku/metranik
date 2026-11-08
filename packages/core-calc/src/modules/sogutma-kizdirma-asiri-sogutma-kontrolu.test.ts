import { describe, it, expect } from "vitest";
import { sogutmaKizdirmaAsiriSogutmaKontrolu } from "./sogutma-kizdirma-asiri-sogutma-kontrolu";

const g = {
  emmeHattiSicakligi_C: 12, evaporasyonSicakligi_C: 5, yogusmaSicakligi_C: 45, sivi_hatti_sicakligi_C: 40,
  kizdirmaMin_K: 5, kizdirmaMax_K: 10, asiriSogutmaMin_K: 3, asiriSogutmaMax_K: 8,
};

describe("Kızdırma ve Aşırı Soğutma Kontrolü", () => {
  it("emme 12 / evap 5 → SH 7 K; yoğuşma 45 / sıvı 40 → SC 5 K; uygun", () => {
    const r = sogutmaKizdirmaAsiriSogutmaKontrolu.compute(g);
    expect(r.value.kizdirma_K).toBe(7);
    expect(r.intermediates.asiri_sogutma_K).toBe(5);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("SH = 3 K (min 5'in 2 K altı) → sınırda; SH = 1 K → uygunsuz", () => {
    expect(sogutmaKizdirmaAsiriSogutmaKontrolu.compute({ ...g, emmeHattiSicakligi_C: 8 }).verdict?.status).toBe("sinirda");
    expect(sogutmaKizdirmaAsiriSogutmaKontrolu.compute({ ...g, emmeHattiSicakligi_C: 6 }).verdict?.status).toBe("uygunsuz");
  });
  it("SC çok yüksek → uygunsuz ve aşırı şarj notu", () => {
    const r = sogutmaKizdirmaAsiriSogutmaKontrolu.compute({ ...g, sivi_hatti_sicakligi_C: 30 });
    expect(r.verdict?.status).toBe("uygunsuz");
    expect(r.verdict?.note).toContain("aşırı şarj");
  });
});
