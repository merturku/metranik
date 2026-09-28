import { describe, it, expect } from "vitest";
import { modul_284 } from "./modul_284";

describe("Modül 284", () => {
  it("Test: 10 → 15", () => {
    const r = modul_284.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
