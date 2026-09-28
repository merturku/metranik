import { describe, it, expect } from "vitest";
import { modul_283 } from "./modul_283";

describe("Modül 283", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_283.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
