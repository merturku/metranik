import { describe, it, expect } from "vitest";
import { modul_312 } from "./modul_312";

describe("Modül 312", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_312.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
