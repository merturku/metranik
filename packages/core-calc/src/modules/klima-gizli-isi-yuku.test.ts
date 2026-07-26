import { describe, expect, it } from "vitest";
import { klimaGizliIsiYuku } from "./klima-gizli-isi-yuku";

describe("klima-gizli-isi-yuku", () => {
  it("Debi=500 L/s, ΔW=5 g/kg → 7.5 kW", () => {
    const r = klimaGizliIsiYuku.compute({ havaDebisi_Ls: 500, nemFarki_dW_gkg: 5 });

    expect(r.value.gizliIsiYuku_kW).toBeCloseTo(7.5, 5);
  });
});
