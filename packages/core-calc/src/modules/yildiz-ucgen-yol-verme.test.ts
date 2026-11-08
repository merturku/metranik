import { describe, it, expect } from "vitest";
import { yildizUcgenYolVerme } from "./yildiz-ucgen-yol-verme";

const g = { dolKalkisAkimi_A: 240, dolKalkisMomenti_Nm: 300, yukKalkisMomenti_Nm: 60 };

describe("Yıldız-Üçgen Yol Verme", () => {
  it("I_DOL = 240 A → 80 A; T_DOL = 300 → 100 Nm; yük 60 Nm: marj 1,67 → uygun", () => {
    const r = yildizUcgenYolVerme.compute(g);
    expect(r.value.yildizKalkisAkimi_A).toBeCloseTo(80, 8);
    expect(r.intermediates.yildiz_kalkis_momenti_Nm as number).toBeCloseTo(100, 8);
    expect(r.intermediates.moment_marji_Ty_Tyuk as number).toBeCloseTo(1.667, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("yük 95 Nm → sınırda; 120 Nm → uygunsuz", () => {
    expect(yildizUcgenYolVerme.compute({ ...g, yukKalkisMomenti_Nm: 95 }).verdict?.status).toBe("sinirda");
    expect(yildizUcgenYolVerme.compute({ ...g, yukKalkisMomenti_Nm: 120 }).verdict?.status).toBe("uygunsuz");
  });
  it("yüksüz kalkışta (0 Nm) uygun", () => {
    expect(yildizUcgenYolVerme.compute({ ...g, yukKalkisMomenti_Nm: 0 }).verdict?.status).toBe("uygun");
  });
});
