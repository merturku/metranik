import { describe, it, expect } from "vitest";
import { modul_292 } from "./modul_292";

describe("Modül 292", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_292.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
