import { describe, it, expect } from "vitest";
import { modul_289 } from "./modul_289";

describe("Modül 289", () => {
  it("Test: 10 → 15", () => {
    const r = modul_289.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
