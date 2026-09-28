import { describe, it, expect } from "vitest";
import { modul_319 } from "./modul_319";

describe("Modül 319", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_319.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
