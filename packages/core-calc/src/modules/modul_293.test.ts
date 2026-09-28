import { describe, it, expect } from "vitest";
import { modul_293 } from "./modul_293";

describe("Modül 293", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_293.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
