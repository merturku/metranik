import { describe, it, expect } from "vitest";
import { modul_253 } from "./modul_253";

describe("Modül 253", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_253.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
