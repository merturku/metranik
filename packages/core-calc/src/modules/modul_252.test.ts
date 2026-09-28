import { describe, it, expect } from "vitest";
import { modul_252 } from "./modul_252";

describe("Modül 252", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_252.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
