import { describe, it, expect } from "vitest";
import { modul_321 } from "./modul_321";
describe("M321", () => { it("T", () => { const r = modul_321.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
