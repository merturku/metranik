import { describe, it, expect } from "vitest";
import { kazanVerimiDogrudanYontem, kazanVerimiDogrudanYontemInputSchema } from "./kazan-verimi-dogrudan-yontem";

const kazan = {
  suDebisi_m3h: 2,
  suYogunlugu_kgm3: 980,
  gidisSicakligi_C: 70,
  donusSicakligi_C: 50,
  gazDebisi_Nm3h: 5,
  altIsilDeger_Hu_kWhm3: 9.59,
};

describe("Kazan Verimi (Doğrudan Yöntem)", () => {
  it("2 m³/h × 980 kg/m³ × 4,186 × 20 K = 45,58 kW; gaz 5 × 9,59 = 47,95 kW → η = %95,06", () => {
    const r = kazanVerimiDogrudanYontem.compute(kazan);
    expect(r.intermediates.suya_verilen_isi_kW).toBeCloseTo(45.5809, 4);
    expect(r.intermediates.yakit_isil_yuku_kW).toBeCloseTo(47.95, 9);
    expect(r.value.kazanVerimi_yuzde).toBeCloseTo(95.0592, 4);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("Gaz debisi 4 Nm³/h ölçülürse η = %118,8 > %111 → ölçüm hatası, uygunsuz", () => {
    const r = kazanVerimiDogrudanYontem.compute({ ...kazan, gazDebisi_Nm3h: 4 });
    expect(r.value.kazanVerimi_yuzde).toBeCloseTo(118.824, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("Dönüş gidişten sıcak olamaz", () => {
    expect(kazanVerimiDogrudanYontemInputSchema.safeParse({ ...kazan, donusSicakligi_C: 75 }).success).toBe(false);
  });
});
