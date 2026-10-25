import { describe, it, expect } from "vitest";
import { hataCevrimEmpedansiKontrolu } from "./hata-cevrim-empedansi-kontrolu";

const c16 = {
  fazNotrGerilimi_U0_V: 230,
  kesiciAnmaAkimi_In_A: 16,
  acmaEgrisi: "C" as const,
  olculenCevrimEmpedansi_Zs_ohm: 0.9,
  sicaklikKatsayisi: 0.8,
};

describe("Hata Çevrim Empedansı (Zs) Kontrolü (IEC 60364-4-41)", () => {
  it("C16, 230 V: Ia = 160 A, Zs,maks = 1,4375 Ω, 0,8 ile 1,15 Ω; ölçülen 0,9 Ω → uygun, If = 255,6 A", () => {
    const r = hataCevrimEmpedansiKontrolu.compute(c16);
    expect(r.intermediates.ani_acma_akimi_Ia_A).toBe(160);
    expect(r.value.maksimumCevrimEmpedansi_ohm).toBeCloseTo(1.4375, 4);
    expect(r.intermediates.sicaklik_katsayili_sinir_ohm).toBeCloseTo(1.15, 4);
    expect(r.intermediates.beklenen_ariza_akimi_A).toBeCloseTo(255.56, 2);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("C16, ölçülen 1,3 Ω: 1,15 < 1,3 ≤ 1,4375 → sınırda", () => {
    const r = hataCevrimEmpedansiKontrolu.compute({ ...c16, olculenCevrimEmpedansi_Zs_ohm: 1.3 });
    expect(r.verdict?.status).toBe("sinirda");
  });

  it("B32: Ia = 5×32 = 160 A, ölçülen 1,6 Ω > 1,4375 Ω → uygunsuz", () => {
    const r = hataCevrimEmpedansiKontrolu.compute({
      ...c16,
      kesiciAnmaAkimi_In_A: 32,
      acmaEgrisi: "B",
      olculenCevrimEmpedansi_Zs_ohm: 1.6,
    });
    expect(r.value.maksimumCevrimEmpedansi_ohm).toBeCloseTo(1.4375, 4);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
