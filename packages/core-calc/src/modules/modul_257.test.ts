import { describe, it, expect } from "vitest";
import { modul_257 } from "./modul_257";

describe("Modül 257", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_257.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
