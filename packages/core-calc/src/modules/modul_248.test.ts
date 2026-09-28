import { describe, it, expect } from "vitest";
import { modul_248 } from "./modul_248";

describe("Modül 248", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_248.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
