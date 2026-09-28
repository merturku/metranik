import { describe, it, expect } from "vitest";
import { modul_325 } from "./modul_325";

describe("Modül 325", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_325.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
