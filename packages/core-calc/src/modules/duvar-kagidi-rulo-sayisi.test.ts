import { describe, it, expect } from "vitest";
import { duvarKagidiRuloSayisi, duvarKagidiRuloSayisiInputSchema } from "./duvar-kagidi-rulo-sayisi";

// 4 × 5 m oda (çevre 18 m), 0,9 m kapı, 2,40 m tavan; standart Avrupa rulosu 53 cm × 10,05 m.
const oda = {
  toplamDuvarUzunlugu_m: 18,
  dusulecekAciklikGenisligi_m: 0.9,
  duvarYuksekligi_m: 2.4,
  ruloEni_cm: 53,
  ruloBoyu_m: 10.05,
  desenTekrari_cm: 0,
  kesimPayi_cm: 10,
};

describe("Duvar Kağıdı Rulo Sayısı", () => {
  it("Desensiz: şerit 2,50 m → rulodan ⌊10,05/2,50⌋ = 4 şerit; ⌈17,1/0,53⌉ = 33 şerit → ⌈33/4⌉ = 9 rulo", () => {
    const r = duvarKagidiRuloSayisi.compute(oda);
    expect(r.intermediates.serit_boyu_m).toBeCloseTo(2.5, 12);
    expect(r.intermediates.rulo_basina_serit).toBe(4);
    expect(r.intermediates.gereken_serit_sayisi).toBe(33);
    expect(r.value.ruloSayisi).toBe(9);
    expect(r.intermediates.kaplanan_alan_m2).toBeCloseTo(41.04, 9);
    expect(r.intermediates.satin_alinan_alan_m2).toBeCloseTo(9 * 10.05 * 0.53, 9);
  });

  it("64 cm desen tekrarı: şerit ⌈2,50/0,64⌉ × 0,64 = 2,56 m → rulodan 3 şerit → ⌈33/3⌉ = 11 rulo", () => {
    const r = duvarKagidiRuloSayisi.compute({ ...oda, desenTekrari_cm: 64 });
    expect(r.intermediates.serit_boyu_m).toBeCloseTo(2.56, 12);
    expect(r.intermediates.rulo_basina_serit).toBe(3);
    expect(r.value.ruloSayisi).toBe(11);
  });

  it("Tam katlarda yuvarlama hatası yok: 2,46 m + 4 cm pay = 2,50 m tam 5 × 50 cm desen → şerit 2,50 m", () => {
    const r = duvarKagidiRuloSayisi.compute({ ...oda, duvarYuksekligi_m: 2.46, kesimPayi_cm: 4, desenTekrari_cm: 50 });
    expect(r.intermediates.serit_boyu_m).toBeCloseTo(2.5, 12);
    expect(r.intermediates.rulo_basina_serit).toBe(4);
  });

  it("Şerit rulodan uzunsa uygunsuz; açıklık duvar uzunluğunu aşamaz", () => {
    const r = duvarKagidiRuloSayisi.compute({ ...oda, duvarYuksekligi_m: 11 });
    expect(r.verdict?.status).toBe("uygunsuz");
    expect(duvarKagidiRuloSayisiInputSchema.safeParse({ ...oda, dusulecekAciklikGenisligi_m: 20 }).success).toBe(false);
  });
});
