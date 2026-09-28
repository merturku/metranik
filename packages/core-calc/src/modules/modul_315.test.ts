import { describe, it, expect } from "vitest";
import { modul_315 } from "./modul_315";

describe("Modül 315", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_315.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
