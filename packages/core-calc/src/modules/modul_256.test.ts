import { describe, it, expect } from "vitest";
import { modul_256 } from "./modul_256";

describe("Modül 256", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_256.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
