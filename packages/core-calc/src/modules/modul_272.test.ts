import { describe, it, expect } from "vitest";
import { modul_272 } from "./modul_272";

describe("Modül 272", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_272.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
