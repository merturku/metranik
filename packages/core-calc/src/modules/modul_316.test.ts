import { describe, it, expect } from "vitest";
import { modul_316 } from "./modul_316";

describe("Modül 316", () => {
  it("Test: 10 → 15", () => {
    const r = modul_316.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
