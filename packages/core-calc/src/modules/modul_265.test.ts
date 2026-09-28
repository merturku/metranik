import { describe, it, expect } from "vitest";
import { modul_265 } from "./modul_265";

describe("Modül 265", () => {
  it("Test: 10 → 15", () => {
    const r = modul_265.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
