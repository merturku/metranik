import { describe, it, expect } from "vitest";
import { modul_330 } from "./modul_330";

describe("Modül 330", () => {
  it("Test: 10 → 15", () => {
    const r = modul_330.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
