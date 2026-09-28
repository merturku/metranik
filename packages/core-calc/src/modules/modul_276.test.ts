import { describe, it, expect } from "vitest";
import { modul_276 } from "./modul_276";

describe("Modül 276", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_276.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
