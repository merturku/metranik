import { describe, it, expect } from "vitest";
import { modul_328 } from "./modul_328";

describe("Modül 328", () => {
  it("Test: 10 → 15", () => {
    const r = modul_328.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
