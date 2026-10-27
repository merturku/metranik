import { describe, it, expect } from "vitest";
import { havaAkimiRahatsizligiDr, havaAkimiRahatsizligiDrInputSchema } from "./hava-akimi-rahatsizligi-dr";

const ofis = { havaSicakligi_C: 22, havaHizi_ms: 0.2, turbulansYogunlugu_yuzde: 40, hedefKategori: "B" as const };

describe("Hava Akımı Rahatsızlığı (Draught Rate, DR)", () => {
  it("22 °C, 0,20 m/s, Tu %40: DR = 12 × 0,15^0,62 × (0,37×0,2×40 + 3,14) = %22,58 → kategori C, hedef B için uygunsuz", () => {
    const r = havaAkimiRahatsizligiDr.compute(ofis);
    expect(r.value.dr_yuzde).toBeCloseTo(22.5781, 3);
    expect(r.intermediates.ulasilan_kategori).toBe("C");
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Hedef B (DR < %20) için 22 °C ve Tu %40'ta izin verilen azami hız ≈ 0,1824 m/s", () => {
    const r = havaAkimiRahatsizligiDr.compute(ofis);
    expect(r.intermediates.hedef_icin_azami_hiz_ms).toBeCloseTo(0.18237, 4);
  });

  it("24 °C, 0,15 m/s, Tu %20: DR = 10 × 0,10^0,62 × 4,25 = %10,20 → kategori B, hedef B uygun", () => {
    const r = havaAkimiRahatsizligiDr.compute({ havaSicakligi_C: 24, havaHizi_ms: 0.15, turbulansYogunlugu_yuzde: 20, hedefKategori: "B" });
    expect(r.value.dr_yuzde).toBeCloseTo(10.195, 3);
    expect(r.intermediates.ulasilan_kategori).toBe("B");
    expect(r.verdict?.status).toBe("uygun");
  });

  it("v < 0,05 m/s ise v = 0,05 alınır → DR = 0 (kategori A)", () => {
    const r = havaAkimiRahatsizligiDr.compute({ ...ofis, havaHizi_ms: 0.03 });
    expect(r.value.dr_yuzde).toBe(0);
    expect(r.intermediates.hesapta_kullanilan_hiz_ms).toBe(0.05);
    expect(r.intermediates.ulasilan_kategori).toBe("A");
  });

  it("Geçerlilik aralığı (20–26 °C, < 0,5 m/s, Tu %10–60) dışında not düşer; şema geçersiz kategoriyi reddeder", () => {
    const r = havaAkimiRahatsizligiDr.compute({ ...ofis, havaSicakligi_C: 18 });
    expect(r.verdict?.note).toContain("geçerlilik");
    expect(havaAkimiRahatsizligiDrInputSchema.safeParse({ ...ofis, hedefKategori: "D" }).success).toBe(false);
  });
});
