import { describe, it, expect } from "vitest";
import { modul_309 } from "./modul_309";

describe("Modül 309", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_309.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
