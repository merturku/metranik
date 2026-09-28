import { describe, it, expect } from "vitest";
import { modul_279 } from "./modul_279";

describe("Modül 279", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_279.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
