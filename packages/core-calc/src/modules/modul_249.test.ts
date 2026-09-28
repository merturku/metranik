import { describe, it, expect } from "vitest";
import { modul_249 } from "./modul_249";

describe("Modül 249", () => {
  it("Test: 10 → 15", () => {
    const r = modul_249.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
