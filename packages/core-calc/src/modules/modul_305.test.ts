import { describe, it, expect } from "vitest";
import { modul_305 } from "./modul_305";

describe("Modül 305", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_305.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
