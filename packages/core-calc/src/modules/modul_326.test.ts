import { describe, it, expect } from "vitest";
import { modul_326 } from "./modul_326";

describe("Modül 326", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_326.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
