import { describe, it, expect } from "vitest";
import { pompaKapaliVanaIsinmasi } from "./pompa-kapali-vana-isinmasi";

describe("Pompa Kapalı Vana Isınması", () => {
  it("5 kW, 20 kg su: 0,059723 K/s = 3,5834 K/dk; 8 K'e 2,2325 dk", () => {
    const r = pompaKapaliVanaIsinmasi.compute({ milGucu_kW: 5, suKutlesi_kg: 20, izinliArtis_K: 8 });
    expect(r.intermediates.isinma_hizi_Ks as number).toBeCloseTo(0.0597229, 6);
    expect(r.value.isinmaHizi_Kdk).toBeCloseTo(3.58337, 4);
    expect(r.intermediates.izinli_artis_suresi_dk as number).toBeCloseTo(2.23253, 4);
  });
  it("güç iki katı → süre yarısı; kütle iki katı → süre iki katı", () => {
    const a = pompaKapaliVanaIsinmasi.compute({ milGucu_kW: 5, suKutlesi_kg: 20, izinliArtis_K: 8 }).intermediates.izinli_artis_suresi_dk as number;
    expect((pompaKapaliVanaIsinmasi.compute({ milGucu_kW: 10, suKutlesi_kg: 20, izinliArtis_K: 8 }).intermediates.izinli_artis_suresi_dk as number) / a).toBeCloseTo(0.5, 10);
    expect((pompaKapaliVanaIsinmasi.compute({ milGucu_kW: 5, suKutlesi_kg: 40, izinliArtis_K: 8 }).intermediates.izinli_artis_suresi_dk as number) / a).toBeCloseTo(2, 10);
  });
});
