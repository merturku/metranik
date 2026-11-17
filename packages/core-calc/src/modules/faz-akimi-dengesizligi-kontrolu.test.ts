import { describe, it, expect } from "vitest";
import { fazAkimiDengesizligiKontrolu } from "./faz-akimi-dengesizligi-kontrolu";

describe("Faz Akımı Dengesizliği", () => {
  it("100/110/96 A: ort 102; sapma 8 A; %7,843 → sınırda", () => {
    const r = fazAkimiDengesizligiKontrolu.compute({ ia_A: 100, ib_A: 110, ic_A: 96 });
    expect(r.intermediates.ortalama_A as number).toBeCloseTo(102, 10);
    expect(r.value.dengesizlik_pct).toBeCloseTo(7.84314, 4);
    expect(r.verdict?.status).toBe("sinirda");
  });
  it("dengeli: %0 uygun, nötr 0; 100/130/70 → %30 uygunsuz", () => {
    const d = fazAkimiDengesizligiKontrolu.compute({ ia_A: 50, ib_A: 50, ic_A: 50 });
    expect(d.value.dengesizlik_pct).toBeCloseTo(0, 10);
    expect(d.intermediates["nötr_akimi_A"] as number).toBeCloseTo(0, 8);
    expect(d.verdict?.status).toBe("uygun");
    expect(fazAkimiDengesizligiKontrolu.compute({ ia_A: 100, ib_A: 130, ic_A: 70 }).verdict?.status).toBe("uygunsuz");
  });
});
