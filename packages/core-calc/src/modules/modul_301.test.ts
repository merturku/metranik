import { describe, it, expect } from "vitest";
import { modul_301 } from "./modul_301";

describe("Modül 301", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_301.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
