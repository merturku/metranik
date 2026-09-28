import { describe, it, expect } from "vitest";
import { modul_292 } from "./modul_292";

describe("Modül 292", () => {
  it("Test: 10 → 15", () => {
    const r = modul_292.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
