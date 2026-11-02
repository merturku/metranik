import { describe, it, expect } from "vitest";
import { isitmaYakitiMaliyetKarsilastirmasi } from "./isitma-yakiti-maliyet-karsilastirmasi";

describe("Isıtma Yakıtı Maliyet Karşılaştırması", () => {
  const o = {
    dogalgazFiyati_TLm3: 8, kombiVerimi: 0.92, elektrikFiyati_TLkWh: 3, isiPompasiSCOP: 3.5,
    peletFiyati_TLkg: 10, peletVerimi: 0.85, lpgFiyati_TLkg: 40, lpgVerimi: 0.9,
  };
  it("birim maliyetler: gaz 0,9067, ısı pompası 0,8571, pelet 2,558, LPG 3,472, elektrik 3 ₺/kWh", () => {
    const r = isitmaYakitiMaliyetKarsilastirmasi.compute(o);
    expect(r.intermediates.dogalgaz_TLkWh as number).toBeCloseTo(0.9067, 4);
    expect(r.intermediates.isi_pompasi_TLkWh as number).toBeCloseTo(0.8571, 4);
    expect(r.intermediates.pelet_TLkWh as number).toBeCloseTo(2.5575, 3);
    expect(r.intermediates.lpg_TLkWh as number).toBeCloseTo(3.4722, 3);
    expect(r.value.enUcuzBirimMaliyet_TLkWh).toBeCloseTo(0.8571, 4);
    expect(r.intermediates.en_ucuz_secenek).toBe("Isı pompası");
  });
  it("ısı pompası SCOP 2'ye düşünce doğalgaz en ucuz olur", () => {
    const r = isitmaYakitiMaliyetKarsilastirmasi.compute({ ...o, isiPompasiSCOP: 2 });
    expect(r.intermediates.en_ucuz_secenek).toBe("Doğalgaz kombi");
  });
});
