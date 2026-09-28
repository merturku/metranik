import { describe, it, expect } from "vitest";
import { modul_274 } from "./modul_274";

describe("Modül 274", () => {
  it("Test: 10 → 15", () => {
    const r = modul_274.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
