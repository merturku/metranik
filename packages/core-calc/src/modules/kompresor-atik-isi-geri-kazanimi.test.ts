import { describe, it, expect } from "vitest";
import { kompresorAtikIsiGeriKazanimi } from "./kompresor-atik-isi-geri-kazanimi";

const g = { milGucu_kW: 55, yukOrani: 0.8, geriKazanimOrani_yuzde: 80, yillikCalismaSaati_h: 4000, degerlendirilenOran_yuzde: 100, kazanVerimi_yuzde: 90, isiBirimFiyati_TLkWh: 1.2 };

describe("Kompresör Atık Isı Geri Kazanımı", () => {
  it("55 kW × 0,8 × %80 = 35,2 kW; 4000 h → 140 800 kWh ısı; kazan %90 → 156 444 kWh yakıt; 187 733 ₺", () => {
    const r = kompresorAtikIsiGeriKazanimi.compute(g);
    expect(r.value.geriKazanilanIsi_kW).toBeCloseTo(35.2, 8);
    expect(r.intermediates.yillik_degerlendirilen_isi_kWh as number).toBeCloseTo(140800, 4);
    expect(r.intermediates.yillik_yakit_tasarrufu_kWh as number).toBeCloseTo(156444.44, 1);
    expect(r.intermediates.yillik_mali_tasarruf_TL as number).toBeCloseTo(187733.33, 0);
  });
  it("değerlendirilen oran %50 → tasarruf yarıya iner", () => {
    const tam = kompresorAtikIsiGeriKazanimi.compute(g).intermediates.yillik_mali_tasarruf_TL as number;
    const yari = kompresorAtikIsiGeriKazanimi.compute({ ...g, degerlendirilenOran_yuzde: 50 }).intermediates.yillik_mali_tasarruf_TL as number;
    expect(yari).toBeCloseTo(tam / 2, 6);
  });
});
