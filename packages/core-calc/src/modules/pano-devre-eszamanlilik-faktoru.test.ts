import { describe, it, expect } from "vitest";
import { panoDevreEszamanlilikFaktoru } from "./pano-devre-eszamanlilik-faktoru";

describe("Pano Devre Eşzamanlılık Faktörü", () => {
  it("8 devre, ΣIn = 200 A: RDF 0,7 → 140 A", () => {
    const r = panoDevreEszamanlilikFaktoru.compute({ devreSayisi: 8, toplamAkim_A: 200 });
    expect(r.intermediates.rdf).toBe(0.7);
    expect(r.value.tasarimAkimi_A).toBeCloseTo(140, 10);
  });
  it("sınırlar: 1 → 1,0; 3 → 0,9; 5 → 0,8; 10 → 0,6", () => {
    const f = (n: number) => panoDevreEszamanlilikFaktoru.compute({ devreSayisi: n, toplamAkim_A: 100 }).intermediates.rdf;
    expect([f(1), f(3), f(4), f(5), f(6), f(9), f(10), f(25)]).toEqual([1, 0.9, 0.8, 0.8, 0.7, 0.7, 0.6, 0.6]);
  });
});
