import { describe, it, expect } from "vitest";
import { modul_295 } from "./modul_295";

describe("Modül 295", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_295.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
