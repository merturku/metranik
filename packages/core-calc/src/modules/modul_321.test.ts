import { describe, it, expect } from "vitest";
import { modul_321 } from "./modul_321";

describe("Modül 321", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_321.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
