import { describe, it, expect } from "vitest";
import { modul_274 } from "./modul_274";

describe("Modül 274", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_274.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
