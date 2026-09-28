import { describe, it, expect } from "vitest";
import { modul_258 } from "./modul_258";

describe("Modül 258", () => {
  it("Test: 10 → 15", () => {
    const r = modul_258.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
