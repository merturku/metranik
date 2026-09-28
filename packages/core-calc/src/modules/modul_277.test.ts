import { describe, it, expect } from "vitest";
import { modul_277 } from "./modul_277";

describe("Modül 277", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_277.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
