import { describe, it, expect } from "vitest";
import { sogutucuHatHiziKontrolu } from "./sogutucu-hat-hizi-kontrolu";

const g = { m_kgs: 0.1, nu_m3kg: 0.05, icCap_mm: 25, vMin_ms: 5, vMaks_ms: 15 };

describe("Soğutucu Hat Hızı Kontrolü", () => {
  it("0,1 kg/s, ν 0,05, Ø25: A = 490,87 mm²; Q = 18 m³/h; v = 10,186 m/s → uygun", () => {
    const r = sogutucuHatHiziKontrolu.compute(g);
    expect(r.intermediates.kesit_alani_mm2 as number).toBeCloseTo(490.874, 2);
    expect(r.intermediates.hacimsel_debi_m3h as number).toBeCloseTo(18, 8);
    expect(r.value.hiz_ms).toBeCloseTo(10.1859, 3);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("ν 0,01 → v = 2,037 < 5 uygunsuz (yağ dönüşü); çap 15 mm → v > 15 uygunsuz; v 5,3 sınırda", () => {
    expect(sogutucuHatHiziKontrolu.compute({ ...g, nu_m3kg: 0.01 }).verdict?.status).toBe("uygunsuz");
    expect(sogutucuHatHiziKontrolu.compute({ ...g, icCap_mm: 15 }).verdict?.status).toBe("uygunsuz");
    expect(sogutucuHatHiziKontrolu.compute({ ...g, nu_m3kg: 0.026 }).verdict?.status).toBe("sinirda");
  });
  it("Zod: vMaks ≤ vMin reddedilir", () => {
    expect(sogutucuHatHiziKontrolu.inputSchema.safeParse({ ...g, vMaks_ms: 5 }).success).toBe(false);
  });
});
