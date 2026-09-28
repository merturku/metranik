import { describe, it, expect } from "vitest";
import { modul_268 } from "./modul_268";

describe("Modül 268", () => {
  it("Test: 1 → 1.5", () => {
    const r = modul_268.compute({ girdi: 1 });
    expect(r.value.sonuc).toBe(1.5);
  });
});
