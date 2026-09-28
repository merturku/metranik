import { describe, it, expect } from "vitest";
import { modul_264 } from "./modul_264";

describe("Modül 264", () => {
  it("Test: 10 → 15", () => {
    const r = modul_264.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
