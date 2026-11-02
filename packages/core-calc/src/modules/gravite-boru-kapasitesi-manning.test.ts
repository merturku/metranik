import { describe, it, expect } from "vitest";
import { graviteBoruKapasitesiManning } from "./gravite-boru-kapasitesi-manning";

describe("Gravite Boru Kapasitesi (Manning)", () => {
  const o = { icCap_mm: 200, egim_yuzde: 1, puruzluluk_n: 0.013, tasarimDebisi_Ls: 20 };
  it("Ø200, %1, n 0,013 → Q = (1/n)·A·(D/4)^(2/3)·√S ≈ 32,8 L/s; v ≈ 1,04 m/s", () => {
    const r = graviteBoruKapasitesiManning.compute(o);
    expect(r.value.doluKapasite_Ls).toBeCloseTo(32.8, 1);
    expect(r.intermediates.dolu_hiz_ms as number).toBeCloseTo(1.04, 2);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("kapasitenin üstü uygunsuz, %75–100 sınırda", () => {
    expect(graviteBoruKapasitesiManning.compute({ ...o, tasarimDebisi_Ls: 40 }).verdict?.status).toBe("uygunsuz");
    expect(graviteBoruKapasitesiManning.compute({ ...o, tasarimDebisi_Ls: 30 }).verdict?.status).toBe("sinirda");
  });
});
