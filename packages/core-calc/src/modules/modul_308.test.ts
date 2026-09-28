import { describe, it, expect } from "vitest";
import { modul_308 } from "./modul_308";

describe("Modül 308", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_308.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
