import { describe, it, expect } from "vitest";
import { modul_255 } from "./modul_255";
describe("M255", () => { it("T", () => { const r = modul_255.compute({ v: 1 }); expect(r.value.r).toBe(2); }); });
