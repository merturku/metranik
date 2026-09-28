import { describe, it, expect } from "vitest";
import { modul_327 } from "./modul_327";

describe("Modül 327", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_327.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
