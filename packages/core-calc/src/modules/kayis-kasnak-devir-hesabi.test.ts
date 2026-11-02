import { describe, it, expect } from "vitest";
import { kayisKasnakDevirHesabi } from "./kayis-kasnak-devir-hesabi";

describe("Kayış–Kasnak Devir Hesabı", () => {
  const o = { motorDevri_dk: 1450, motorKasnakCapi_mm: 100, fanKasnakCapi_mm: 200, eksenMesafesi_mm: 400, kaymaYuzde: 0 };
  it("1450 dev/dk, 100/200 mm → fan 725 dev/dk; v = 7,59 m/s; L = 800 + 471,24 + 6,25 = 1277,5 mm", () => {
    const r = kayisKasnakDevirHesabi.compute(o);
    expect(r.value.fanDevri_dk).toBeCloseTo(725, 9);
    expect(r.intermediates.kayis_hizi_ms as number).toBeCloseTo(7.592, 3);
    expect(r.intermediates.kayis_boyu_mm as number).toBeCloseTo(1277.49, 1);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("%2 kayma devri 710,5'e düşürür; çok büyük kasnak hızı uygunsuz", () => {
    expect(kayisKasnakDevirHesabi.compute({ ...o, kaymaYuzde: 2 }).value.fanDevri_dk).toBeCloseTo(710.5, 6);
    expect(kayisKasnakDevirHesabi.compute({ ...o, motorKasnakCapi_mm: 400, fanKasnakCapi_mm: 400, eksenMesafesi_mm: 800 }).verdict?.status).toBe("uygunsuz");
  });
  it("eşit kasnak: sarım açısı 180°", () => {
    expect(kayisKasnakDevirHesabi.compute({ ...o, fanKasnakCapi_mm: 100 }).intermediates.kucuk_kasnak_sarim_acisi_derece as number).toBeCloseTo(180, 6);
  });
});
