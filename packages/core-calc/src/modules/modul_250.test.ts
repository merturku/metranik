import { describe, it, expect } from "vitest";
import { modul_250 } from "./modul_250";

describe("Modül 250", () => {
  it("Test: 10 → 15", () => {
    const r = modul_250.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
