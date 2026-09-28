import { describe, it, expect } from "vitest";
import { modul_317 } from "./modul_317";

describe("Modül 317", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_317.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
