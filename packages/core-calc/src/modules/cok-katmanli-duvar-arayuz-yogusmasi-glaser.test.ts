import { describe, it, expect } from "vitest";
import { cokKatmanliDuvarArayuzYogusmasiGlaser } from "./cok-katmanli-duvar-arayuz-yogusmasi-glaser";

describe("Çok Katmanlı Duvar Arayüz Yoğuşması (Glaser)", () => {
  const ortak = { icSicaklik_C: 20, icNem: 0.5, disSicaklik_C: -5, disNem: 0.8 };
  it("dış yalıtımlı duvar (sıva 2 cm, tuğla 19 cm, EPS 5 cm): maks pv/psat = 0,545 → uygun", () => {
    const r = cokKatmanliDuvarArayuzYogusmasiGlaser.compute({ ...ortak, d1_m: 0.02, lambda1: 0.87, mu1: 10, d2_m: 0.19, lambda2: 0.45, mu2: 10, d3_m: 0.05, lambda3: 0.04, mu3: 30 });
    expect(r.intermediates.arayuz1_sicaklik_C as number).toBeCloseTo(17.9494, 3);
    expect(r.intermediates.arayuz1_pv_Pa as number).toBeCloseTo(1121.39, 1);
    expect(r.value.maksDoymaOrani).toBeCloseTo(0.54535, 4);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("iç yalıtımlı duvar (EPS içte): 1. arayüz 1,50 °C, pv/psat = 1,198 → uygunsuz", () => {
    const r = cokKatmanliDuvarArayuzYogusmasiGlaser.compute({ ...ortak, d1_m: 0.05, lambda1: 0.04, mu1: 30, d2_m: 0.19, lambda2: 0.45, mu2: 10, d3_m: 0.02, lambda3: 0.87, mu3: 10 });
    expect(r.intermediates.arayuz1_sicaklik_C as number).toBeCloseTo(1.50343, 4);
    expect(r.value.maksDoymaOrani).toBeCloseTo(1.19794, 4);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
  it("iç ve dış koşullar aynıysa tüm arayüzlerde oran = bağıl nem", () => {
    const r = cokKatmanliDuvarArayuzYogusmasiGlaser.compute({ icSicaklik_C: 20, icNem: 0.5, disSicaklik_C: 20, disNem: 0.5, d1_m: 0.02, lambda1: 0.87, mu1: 10, d2_m: 0.19, lambda2: 0.45, mu2: 10, d3_m: 0.05, lambda3: 0.04, mu3: 30 });
    expect(r.value.maksDoymaOrani).toBeCloseTo(0.5, 10);
  });
});
