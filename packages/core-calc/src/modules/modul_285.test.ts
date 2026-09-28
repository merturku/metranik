import { describe, it, expect } from "vitest";
import { modul_285 } from "./modul_285";

describe("Modül 285", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_285.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
