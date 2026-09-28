import { describe, it, expect } from "vitest";
import { modul_324 } from "./modul_324";

describe("Modül 324", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_324.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
