import { describe, it, expect } from "vitest";
import { modul_318 } from "./modul_318";

describe("Modül 318", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_318.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
