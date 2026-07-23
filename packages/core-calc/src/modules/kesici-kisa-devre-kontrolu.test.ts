import { describe, expect, it } from "vitest";
import { kesiciKisaDevreKontrolu } from "./kesici-kisa-devre-kontrolu";

describe("kesici-kisa-devre-kontrolu", () => {
  it("kesici kapasitesi hesaplanan akımın üzerindeyse uygun döner", () => {
    const r = kesiciKisaDevreKontrolu.compute({
      hesaplananKisaDevreAkimi_kA: 24,
      kesiciAnmaKapasitesi_kA: 25,
    });

    expect(r.value.marj_kA).toBeCloseTo(1, 5);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("kesici kapasitesi yetersizse uygunsuz döner", () => {
    const r = kesiciKisaDevreKontrolu.compute({
      hesaplananKisaDevreAkimi_kA: 24,
      kesiciAnmaKapasitesi_kA: 20,
    });

    expect(r.value.marj_kA).toBeCloseTo(-4, 5);
    expect(r.verdict?.status).toBe("uygunsuz");
  });
});
