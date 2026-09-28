import { describe, it, expect } from "vitest";
import { modul_297 } from "./modul_297";

describe("Modül 297", () => {
  it("Test: 10 → 15", () => {
    const r = modul_297.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
