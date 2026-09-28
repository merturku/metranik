import { describe, it, expect } from "vitest";
import { modul_242 } from "./modul_242";

describe("Modül 242", () => {
  it("Test: 10 → 15", () => {
    const r = modul_242.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
