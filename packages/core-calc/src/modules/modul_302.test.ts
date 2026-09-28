import { describe, it, expect } from "vitest";
import { modul_302 } from "./modul_302";

describe("Modül 302", () => {
  it("Test: 10 → 15", () => {
    const r = modul_302.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
