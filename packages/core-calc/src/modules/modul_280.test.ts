import { describe, it, expect } from "vitest";
import { modul_280 } from "./modul_280";
describe("M280", () => { it("T", () => { const r = modul_280.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
