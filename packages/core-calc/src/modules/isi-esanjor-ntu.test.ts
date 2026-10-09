import { describe, it, expect } from "vitest";
import { isiEsanjorNtu } from "./isi-esanjor-ntu";
describe("NTU", () => {
  it("10 C_min, 20 UA", () => {
    const r = isiEsanjorNtu.compute({ C_min: 10, UA: 20 });
    expect(r.value.NTU).toBeGreaterThan(1);
  });
});
