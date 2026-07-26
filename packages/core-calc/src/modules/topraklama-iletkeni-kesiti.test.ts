import { describe, expect, it } from "vitest";
import { topraklamaIletkeniKesiti } from "./topraklama-iletkeni-kesiti";

describe("topraklama-iletkeni-kesiti", () => {
  it("IEC 60364-5-54: I=1000A, t=0.5s, k=143 → ~4.945 mm²", () => {
    const r = topraklamaIletkeniKesiti.compute({
      hataAkimi_I_A: 1000,
      kesmeSuresi_t_s: 0.5,
      malzemeKatsayisi_k: 143,
    });

    expect(r.value.gerekliKesit_mm2).toBeCloseTo(4.9448, 3);
  });
});
