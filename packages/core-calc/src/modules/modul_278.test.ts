import { describe, it, expect } from "vitest";
import { modul_278 } from "./modul_278";

describe("Modül 278", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_278.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
