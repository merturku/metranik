import { describe, it, expect } from "vitest";
import { modul_262 } from "./modul_262";

describe("Modül 262", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_262.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
