import { describe, it, expect } from "vitest";
import { modul_273 } from "./modul_273";

describe("Modül 273", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_273.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
