import { describe, it, expect } from "vitest";
import { modul_304 } from "./modul_304";
describe("M304", () => { it("T", () => { const r = modul_304.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
