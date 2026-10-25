import { describe, it, expect } from "vitest";
import { gerilimDengesizligiKontrolu, gerilimDengesizligiKontroluInputSchema } from "./gerilim-dengesizligi-kontrolu";

// Simetrik bileşenlerle bağımsız doğrulama: hat gerilimi fazörleri kapalı bir
// üçgen oluşturur (Vab + Vbc + Vca = 0); V1 = (Vab + a·Vbc + a²·Vca)/3,
// V2 = (Vab + a²·Vbc + a·Vca)/3, a = 1∠120°.
function simetrikBilesenOrani(ab: number, bc: number, ca: number): number {
  const g = Math.acos((ca * ca - ab * ab - bc * bc) / (2 * ab * bc));
  const Vab: [number, number] = [ab, 0];
  const Vbc: [number, number] = [bc * Math.cos(g), -bc * Math.sin(g)];
  const Vca: [number, number] = [-(Vab[0] + Vbc[0]), -(Vab[1] + Vbc[1])];
  const carp = (x: [number, number], y: [number, number]): [number, number] => [
    x[0] * y[0] - x[1] * y[1],
    x[0] * y[1] + x[1] * y[0],
  ];
  const a: [number, number] = [Math.cos((2 * Math.PI) / 3), Math.sin((2 * Math.PI) / 3)];
  const a2 = carp(a, a);
  const topla = (...v: [number, number][]) => v.reduce((s, x) => [s[0] + x[0], s[1] + x[1]], [0, 0]);
  const V1 = topla(Vab, carp(a, Vbc), carp(a2, Vca));
  const V2 = topla(Vab, carp(a2, Vbc), carp(a, Vca));
  const m1 = Math.hypot(V1[0], V1[1]);
  const m2 = Math.hypot(V2[0], V2[1]);
  return (Math.min(m1, m2) / Math.max(m1, m2)) * 100;
}

describe("Gerilim Dengesizliği Kontrolü", () => {
  it("ABD DOE motor ipucu örneği 462/463/455 V: ortalama 460 V, NEMA = 5/460 = %1,09; IEC u2 = %1,09 → uygun", () => {
    const r = gerilimDengesizligiKontrolu.compute({ hatGerilimiAB_V: 462, hatGerilimiBC_V: 463, hatGerilimiCA_V: 455 });
    expect(r.intermediates.ortalama_hat_gerilimi_V).toBeCloseTo(460, 9);
    expect(r.intermediates.nema_lvur_yuzde).toBeCloseTo(1.08696, 4);
    expect(r.value.dengesizlikOrani_u2_yuzde).toBeCloseTo(simetrikBilesenOrani(462, 463, 455), 9);
    expect(r.value.dengesizlikOrani_u2_yuzde).toBeCloseTo(1.0914, 3);
    expect(r.intermediates.motor_sicaklik_artisi_artis_yuzde).toBeCloseTo(2 * 1.08696 ** 2, 3);
    expect(r.verdict?.status).toBe("uygun");
  });

  it("400/390/410 V: NEMA %2,5; simetrik bileşen yöntemiyle u2 = %2,888 → sınırda", () => {
    const r = gerilimDengesizligiKontrolu.compute({ hatGerilimiAB_V: 400, hatGerilimiBC_V: 390, hatGerilimiCA_V: 410 });
    expect(r.intermediates.nema_lvur_yuzde).toBeCloseTo(2.5, 9);
    expect(r.value.dengesizlikOrani_u2_yuzde).toBeCloseTo(simetrikBilesenOrani(400, 390, 410), 9);
    expect(r.value.dengesizlikOrani_u2_yuzde).toBeCloseTo(2.888, 3);
    expect(r.verdict?.status).toBe("sinirda");
  });

  it("400/380/410 V: u2 = %4,42 → uygunsuz; dengeli sistemde β = 1/3 ve u2 = 0", () => {
    const r = gerilimDengesizligiKontrolu.compute({ hatGerilimiAB_V: 400, hatGerilimiBC_V: 380, hatGerilimiCA_V: 410 });
    expect(r.value.dengesizlikOrani_u2_yuzde).toBeCloseTo(4.4244, 3);
    expect(r.verdict?.status).toBe("uygunsuz");
    const dengeli = gerilimDengesizligiKontrolu.compute({ hatGerilimiAB_V: 400, hatGerilimiBC_V: 400, hatGerilimiCA_V: 400 });
    expect(dengeli.intermediates.beta_katsayisi).toBeCloseTo(1 / 3, 12);
    expect(dengeli.value.dengesizlikOrani_u2_yuzde).toBeCloseTo(0, 6);
  });

  it("Üçgen oluşturmayan gerilimler reddedilir", () => {
    expect(
      gerilimDengesizligiKontroluInputSchema.safeParse({ hatGerilimiAB_V: 400, hatGerilimiBC_V: 100, hatGerilimiCA_V: 100 }).success,
    ).toBe(false);
  });
});
