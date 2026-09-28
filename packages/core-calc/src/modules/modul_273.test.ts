import { describe, it, expect } from "vitest";
import { modul_273 } from "./modul_273";
describe("M273", () => { it("T", () => { const r = modul_273.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
