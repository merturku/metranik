import { describe, it, expect } from "vitest";
import { modul_311 } from "./modul_311";

describe("Modül 311", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_311.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
