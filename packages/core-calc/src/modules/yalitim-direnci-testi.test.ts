import { describe, expect, it } from "vitest";
import { yalitimDirenciTesti } from "./yalitim-direnci-testi";

describe("yalitim-direnci-testi", () => {
  it("düşük gerilim kategorisinde asgari 1.0 MΩ üzerinde uygun döner", () => {
    const r = yalitimDirenciTesti.compute({ kategori: "dusuk", olculenDirenc_MOhm: 1.5 });

    expect(r.value.asgariDirenc_MOhm).toBeCloseTo(1.0, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("düşük gerilim kategorisinde asgari değerin altında uygunsuz döner", () => {
    const r = yalitimDirenciTesti.compute({ kategori: "dusuk", olculenDirenc_MOhm: 0.8 });

    expect(r.verdict?.status).toBe("uygunsuz");
  });

  it("SELV kategorisinde asgari 0.5 MΩ uygulanır", () => {
    const r = yalitimDirenciTesti.compute({ kategori: "selv", olculenDirenc_MOhm: 0.6 });

    expect(r.value.asgariDirenc_MOhm).toBeCloseTo(0.5, 5);
    expect(r.verdict?.status).toBe("uygun");
  });
});
