import { describe, it, expect } from "vitest";
import { modul_302 } from "./modul_302";

describe("Modül 302", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_302.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
