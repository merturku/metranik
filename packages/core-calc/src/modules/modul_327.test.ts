import { describe, it, expect } from "vitest";
import { modul_327 } from "./modul_327";
describe("M327", () => { it("T", () => { const r = modul_327.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
