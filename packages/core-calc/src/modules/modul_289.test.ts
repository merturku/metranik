import { describe, it, expect } from "vitest";
import { modul_289 } from "./modul_289";

describe("Modül 289", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_289.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
