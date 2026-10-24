import { describe, it, expect } from "vitest";
import { isiEsanjorNtu } from "./isi-esanjoru-ntu";
describe("Isı Eşanjörü NTU", () => {
  it("10 kW/K C_min, 20 kW/K UA → NTU=2", () => {
    const r = isiEsanjorNtu.compute({ C_min_W_K: 10000, U_A_W_K: 20000 });
    expect(r.value.NTU).toBeCloseTo(2, 0);
  });
});
