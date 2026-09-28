import { describe, it, expect } from "vitest";
import { modul_306 } from "./modul_306";
describe("M306", () => { it("T", () => { const r = modul_306.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
