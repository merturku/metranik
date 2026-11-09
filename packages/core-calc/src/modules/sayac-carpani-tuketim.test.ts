import { describe, it, expect } from "vitest";
import { sayacCarpaniTuketim } from "./sayac-carpani-tuketim";

describe("Sayaç Çarpanı ile Tüketim", () => {
  it("CT 200/5 (40), VT 1: (12500 − 12000)·40 = 20 000 kWh", () => {
    const r = sayacCarpaniTuketim.compute({ ilkEndeks: 12000, sonEndeks: 12500, ctPrimer_A: 200, ctSekonder_A: 5, vtOrani: 1, sayacBasamakSayisi: 0 });
    expect(r.intermediates.carpan).toBe(40);
    expect(r.value.tuketim).toBe(20000);
  });
  it("tam dolaylı: CT 100/5 × VT 20 000/100 = 20 × 200 = 4000 çarpan", () => {
    const r = sayacCarpaniTuketim.compute({ ilkEndeks: 10, sonEndeks: 12, ctPrimer_A: 100, ctSekonder_A: 5, vtOrani: 200, sayacBasamakSayisi: 0 });
    expect(r.intermediates.carpan).toBe(4000);
    expect(r.value.tuketim).toBe(8000);
  });
  it("endeks taşması (5 basamak): 99 900 → 100 → fark 200 → ×40 = 8000; basamak yoksa uygunsuz", () => {
    const r = sayacCarpaniTuketim.compute({ ilkEndeks: 99900, sonEndeks: 100, ctPrimer_A: 200, ctSekonder_A: 5, vtOrani: 1, sayacBasamakSayisi: 5 });
    expect(r.value.tuketim).toBe(8000);
    expect(r.intermediates.endeks_tasmasi_duzeltildi).toBe("evet");
    expect(sayacCarpaniTuketim.compute({ ilkEndeks: 99900, sonEndeks: 100, ctPrimer_A: 200, ctSekonder_A: 5, vtOrani: 1, sayacBasamakSayisi: 0 }).verdict?.status).toBe("uygunsuz");
  });
});
