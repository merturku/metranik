import { describe, it, expect } from "vitest";
import { modul_305 } from "./modul_305";

describe("Modül 305", () => {
  it("Test: 10 → 15", () => {
    const r = modul_305.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
