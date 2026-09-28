import { describe, it, expect } from "vitest";
import { modul_262 } from "./modul_262";

describe("Modül 262", () => {
  it("Test: 10 → 15", () => {
    const r = modul_262.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
