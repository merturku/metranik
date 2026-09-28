import { describe, it, expect } from "vitest";
import { modul_286 } from "./modul_286";

describe("Modül 286", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_286.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
