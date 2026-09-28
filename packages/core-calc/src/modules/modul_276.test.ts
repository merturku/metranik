import { describe, it, expect } from "vitest";
import { modul_276 } from "./modul_276";

describe("Modül 276", () => {
  it("Test: 10 → 15", () => {
    const r = modul_276.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
