import { describe, it, expect } from "vitest";
import { modul_284 } from "./modul_284";

describe("Modül 284", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_284.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
