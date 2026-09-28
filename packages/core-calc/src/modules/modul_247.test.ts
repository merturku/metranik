import { describe, it, expect } from "vitest";
import { modul_247 } from "./modul_247";

describe("Modül 247", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_247.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
