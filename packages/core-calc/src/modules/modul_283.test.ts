import { describe, it, expect } from "vitest";
import { modul_283 } from "./modul_283";

describe("Modül 283", () => {
  it("Test: 10 → 15", () => {
    const r = modul_283.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
