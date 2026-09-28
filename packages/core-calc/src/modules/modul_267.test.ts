import { describe, it, expect } from "vitest";
import { modul_267 } from "./modul_267";

describe("Modül 267", () => {
  it("Test: 10 → 15", () => {
    const r = modul_267.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
