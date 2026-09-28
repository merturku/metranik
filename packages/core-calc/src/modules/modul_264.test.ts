import { describe, it, expect } from "vitest";
import { modul_264 } from "./modul_264";

describe("Modül 264", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_264.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
