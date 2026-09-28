import { describe, it, expect } from "vitest";
import { modul_308 } from "./modul_308";

describe("Modül 308", () => {
  it("Test: 10 → 15", () => {
    const r = modul_308.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
