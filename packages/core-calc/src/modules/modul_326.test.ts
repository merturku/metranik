import { describe, it, expect } from "vitest";
import { modul_326 } from "./modul_326";
describe("M326", () => { it("T", () => { const r = modul_326.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
