import { describe, it, expect } from "vitest";
import { modul_251 } from "./modul_251";

describe("Modül 251", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_251.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
