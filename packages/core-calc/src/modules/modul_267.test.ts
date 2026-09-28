import { describe, it, expect } from "vitest";
import { modul_267 } from "./modul_267";
describe("M267", () => { it("T", () => { const r = modul_267.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
