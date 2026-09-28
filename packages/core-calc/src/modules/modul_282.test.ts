import { describe, it, expect } from "vitest";
import { modul_282 } from "./modul_282";

describe("Modül 282", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_282.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
