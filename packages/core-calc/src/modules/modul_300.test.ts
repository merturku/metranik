import { describe, it, expect } from "vitest";
import { modul_300 } from "./modul_300";

describe("Modül 300", () => {
  it("Test: 10 → 15", () => {
    const r = modul_300.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
