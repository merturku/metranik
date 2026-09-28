import { describe, it, expect } from "vitest";
import { modul_298 } from "./modul_298";

describe("Modül 298", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_298.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
