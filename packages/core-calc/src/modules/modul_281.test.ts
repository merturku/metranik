import { describe, it, expect } from "vitest";
import { modul_281 } from "./modul_281";

describe("Modül 281", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_281.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
