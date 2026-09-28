import { describe, it, expect } from "vitest";
import { modul_316 } from "./modul_316";

describe("Modül 316", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_316.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
