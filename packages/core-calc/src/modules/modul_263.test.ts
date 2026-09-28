import { describe, it, expect } from "vitest";
import { modul_263 } from "./modul_263";

describe("Modül 263", () => {
  it("Test: 10 → 15", () => {
    const r = modul_263.compute({ guc_kW: 10 });
    expect(r.value.sonuc).toBe(15);
  });
});
