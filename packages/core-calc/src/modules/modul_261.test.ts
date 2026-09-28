import { describe, it, expect } from "vitest";
import { modul_261 } from "./modul_261";

describe("Modül 261", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_261.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
