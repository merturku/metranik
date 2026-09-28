import { describe, it, expect } from "vitest";
import { modul_310 } from "./modul_310";

describe("Modül 310", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_310.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
