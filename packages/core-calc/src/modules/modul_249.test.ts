import { describe, it, expect } from "vitest";
import { modul_249 } from "./modul_249";

describe("Modül 249", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_249.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
