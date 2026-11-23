import { describe, it, expect } from "vitest";
import { ciftAnkastreKirisTesirleri } from "./cift-ankastre-kiris-tesirleri";

const g = { aciklik_m: 6, yayiliYuk_kNm: 20, ortaTekilYuk_kN: 0, elastisiteModulu_GPa: 30, atalet_cm4: 200000, sehimSiniriPaydasi: 250 };

describe("İki Ucu Ankastre Kiriş", () => {
  it("w = 20, L = 6: R = 60, M_uç = 60, M_orta = 30 kNm; δ = wL⁴/384EI = 1,125 mm", () => {
    const r = ciftAnkastreKirisTesirleri.compute(g);
    expect(r.intermediates.mesnet_reaksiyonu_kN as number).toBeCloseTo(60, 10);
    expect(r.value.ucMomenti_kNm).toBeCloseTo(60, 10);
    expect(r.intermediates.aciklik_ortasi_momenti_kNm as number).toBeCloseTo(30, 10);
    expect(r.intermediates.orta_sehim_mm as number).toBeCloseTo(1.125, 6);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("w + P: M_uç + M_orta = basit mesnetli Mmaks (denge) ve tekil yük katkısı", () => {
    const r = ciftAnkastreKirisTesirleri.compute({ ...g, ortaTekilYuk_kN: 40 });
    expect(r.value.ucMomenti_kNm).toBeCloseTo(90, 10);
    expect(r.intermediates.aciklik_ortasi_momenti_kNm as number).toBeCloseTo(60, 10);
    expect(r.intermediates.denge_kontrolu_Muc_arti_Morta_kNm as number).toBeCloseTo(r.intermediates.basit_mesnetli_Mmaks_kNm as number, 10);
    expect(r.intermediates.mesnet_reaksiyonu_kN as number).toBeCloseTo(80, 10);
  });
  it("sehim sınırı aşılırsa uygunsuz", () => {
    expect(ciftAnkastreKirisTesirleri.compute({ ...g, atalet_cm4: 2000 }).verdict?.status).toBe("uygunsuz");
  });
});
