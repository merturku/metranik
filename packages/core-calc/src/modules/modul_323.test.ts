import { describe, it, expect } from "vitest";
import { modul_323 } from "./modul_323";

describe("Modül 323", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_323.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
