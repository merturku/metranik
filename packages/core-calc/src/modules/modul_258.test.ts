import { describe, it, expect } from "vitest";
import { modul_258 } from "./modul_258";

describe("Modül 258", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_258.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
