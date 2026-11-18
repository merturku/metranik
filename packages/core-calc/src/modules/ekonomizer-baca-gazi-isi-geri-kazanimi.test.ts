import { describe, it, expect } from "vitest";
import { ekonomizerBacaGaziIsiGeriKazanimi } from "./ekonomizer-baca-gazi-isi-geri-kazanimi";

describe("Ekonomizer Baca Gazı Isı Geri Kazanımı", () => {
  const g = { gazKutleDebisi_kgs: 0.5, gazCp_kJkgK: 1.1, gazGiris_C: 220, gazCikis_C: 140, suDebisi_kgs: 1, suGiris_C: 60, asitCiyNoktasi_C: 55, kazanVerimi: 0.9, yillikSaat_h: 4000, yakitFiyati_TLkWh: 1.5 };
  it("0,5 kg/s, cp 1,1, 220→140 °C: Q = 44 kW; su +10,511 K; yakıt 195 555,6 kWh; 293 333 ₺", () => {
    const r = ekonomizerBacaGaziIsiGeriKazanimi.compute(g);
    expect(r.value.geriKazanilanIsi_kW).toBeCloseTo(44, 10);
    expect(r.intermediates.su_sicaklik_artisi_K as number).toBeCloseTo(44 / 4.186, 8);
    expect(r.intermediates.yillik_yakit_tasarrufu_kWh as number).toBeCloseTo(195555.5556, 3);
    expect(r.intermediates.yillik_tasarruf_TL as number).toBeCloseTo(293333.3334, 2);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("çıkış asit çiy noktasına 5 K'den yakınsa sınırda, altındaysa uygunsuz", () => {
    expect(ekonomizerBacaGaziIsiGeriKazanimi.compute({ ...g, gazCikis_C: 58 }).verdict?.status).toBe("sinirda");
    expect(ekonomizerBacaGaziIsiGeriKazanimi.compute({ ...g, gazCikis_C: 50 }).verdict?.status).toBe("uygunsuz");
  });
  it("küçük su debisinde su çıkışı gaz girişini aşar → uygunsuz", () => {
    expect(ekonomizerBacaGaziIsiGeriKazanimi.compute({ ...g, suDebisi_kgs: 0.04 }).verdict?.status).toBe("uygunsuz");
  });
  it("Tçıkış ≤ Tsu,giriş reddedilir", () => {
    expect(ekonomizerBacaGaziIsiGeriKazanimi.inputSchema.safeParse({ ...g, gazCikis_C: 50 }).success).toBe(false);
  });
});
