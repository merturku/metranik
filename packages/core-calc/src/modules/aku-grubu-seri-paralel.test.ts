import { describe, it, expect } from "vitest";
import { akuGrubuSeriParalel } from "./aku-grubu-seri-paralel";

describe("Akü Grubu Seri/Paralel", () => {
  it("12 V 100 Ah hücre, hedef 48 V 200 Ah: Ns = 4, Np = 2, 8 akü; 9,6 kWh; %50 DoD → 4,8 kWh", () => {
    const r = akuGrubuSeriParalel.compute({ hucreGerilimi_V: 12, hucreKapasitesi_Ah: 100, hedefGerilim_V: 48, hedefKapasite_Ah: 200, desarjDerinligi_yuzde: 50 });
    expect(r.intermediates.seri_sayisi_Ns).toBe(4);
    expect(r.intermediates.paralel_kol_sayisi_Np).toBe(2);
    expect(r.value.toplamHucre).toBe(8);
    expect(r.intermediates.toplam_enerji_kWh as number).toBeCloseTo(9.6, 8);
    expect(r.intermediates.kullanilabilir_enerji_kWh as number).toBeCloseTo(4.8, 8);
  });
  it("hedef tam katlarda ek akü gerekmez (48/12 = 4); kesirli hedefte yukarı yuvarlanır (50 V → 5 seri)", () => {
    expect(akuGrubuSeriParalel.compute({ hucreGerilimi_V: 12, hucreKapasitesi_Ah: 100, hedefGerilim_V: 50, hedefKapasite_Ah: 100, desarjDerinligi_yuzde: 80 }).intermediates.seri_sayisi_Ns).toBe(5);
  });
  it("Np > 4 uyarısı", () => {
    expect(String(akuGrubuSeriParalel.compute({ hucreGerilimi_V: 12, hucreKapasitesi_Ah: 50, hedefGerilim_V: 12, hedefKapasite_Ah: 300, desarjDerinligi_yuzde: 80 }).intermediates.paralel_kol_uyarisi)).toContain("> 4");
  });
});
