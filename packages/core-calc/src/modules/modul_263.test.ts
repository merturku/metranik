import { describe, it, expect } from "vitest";
import { modul_263 } from "./modul_263";

describe("Modül 263", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_263.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
