import { describe, it, expect } from "vitest";
import { modul_292 } from "./modul_292";
describe("M292", () => { it("T", () => { const r = modul_292.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
