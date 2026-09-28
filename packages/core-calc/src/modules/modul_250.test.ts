import { describe, it, expect } from "vitest";
import { modul_250 } from "./modul_250";

describe("Modül 250", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_250.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
