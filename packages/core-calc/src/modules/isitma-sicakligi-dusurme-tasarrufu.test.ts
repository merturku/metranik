import { describe, it, expect } from "vitest";
import { isitmaSicakligiDusurmeTasarrufu } from "./isitma-sicakligi-dusurme-tasarrufu";

describe("İç Sıcaklık Düşürme Tasarrufu", () => {
  const o = { mevcutIcSicaklik_C: 22, yeniIcSicaklik_C: 21, sezonOrtalamaDisSicaklik_C: 7, yillikIsitmaEnerjisi_kWh: 15000, birimEnerjiFiyati_TLkWh: 2 };
  it("22→21 °C, Te 7 °C → 1/15 = %6,67; 1000 kWh, 2000 ₺", () => {
    const r = isitmaSicakligiDusurmeTasarrufu.compute(o);
    expect(r.value.tasarrufOrani_yuzde).toBeCloseTo(6.667, 3);
    expect(r.intermediates.yillik_enerji_tasarrufu_kWh as number).toBeCloseTo(1000, 6);
    expect(r.intermediates.yillik_para_tasarrufu_TL as number).toBeCloseTo(2000, 6);
  });
  it("2 °C düşüş → %13,33 (doğrusal); dış ≥ iç reddedilir", () => {
    expect(isitmaSicakligiDusurmeTasarrufu.compute({ ...o, yeniIcSicaklik_C: 20 }).value.tasarrufOrani_yuzde).toBeCloseTo(13.333, 3);
    expect(isitmaSicakligiDusurmeTasarrufu.inputSchema.safeParse({ ...o, sezonOrtalamaDisSicaklik_C: 21 }).success).toBe(false);
  });
});
