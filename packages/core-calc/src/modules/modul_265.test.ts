import { describe, it, expect } from "vitest";
import { modul_265 } from "./modul_265";

describe("Modül 265", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_265.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
