import { describe, it, expect } from "vitest";
import { termosifonDusSuresi, termosifonDusSuresiInputSchema } from "./termosifon-dus-suresi";

const termosifon80 = {
  depoHacmi_L: 80,
  depoSicakligi_C: 60,
  sebekeSuyuSicakligi_C: 15,
  dusSicakligi_C: 40,
  dusDebisi_Ldk: 8,
  kullanilabilirOran: 1,
};

describe("Termosifon / Boyler Duş Süresi", () => {
  it("80 L, 60 °C depo, 15 °C şebeke, 40 °C duş, 8 L/dk: Vkarışık = 80×45/25 = 144 L, t = 18 dk; sıcak 4,44 + soğuk 3,56 L/dk", () => {
    const r = termosifonDusSuresi.compute(termosifon80);
    expect(r.intermediates.karisik_su_hacmi_L).toBeCloseTo(144, 6);
    expect(r.value.dusSuresi_dk).toBeCloseTo(18, 6);
    expect(r.intermediates.depodan_sicak_su_debisi_Ldk).toBeCloseTo(4.44444, 5);
    expect(r.intermediates.sebekeden_soguk_su_debisi_Ldk).toBeCloseTo(3.55556, 5);
  });

  it("Depo 50 °C, kullanılabilir oran 0,85: Vkarışık = 80×0,85×35/25 = 95,2 L, t = 11,9 dk", () => {
    const r = termosifonDusSuresi.compute({ ...termosifon80, depoSicakligi_C: 50, kullanilabilirOran: 0.85 });
    expect(r.intermediates.karisik_su_hacmi_L).toBeCloseTo(95.2, 6);
    expect(r.value.dusSuresi_dk).toBeCloseTo(11.9, 6);
  });

  it("Duş sıcaklığı depo sıcaklığından yüksekse girdi reddedilir", () => {
    expect(termosifonDusSuresiInputSchema.safeParse({ ...termosifon80, dusSicakligi_C: 65 }).success).toBe(false);
  });
});
