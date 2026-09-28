import { describe, it, expect } from "vitest";
import { modul_281 } from "./modul_281";
describe("M281", () => { it("T", () => { const r = modul_281.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
