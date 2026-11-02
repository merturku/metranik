import { describe, it, expect } from "vitest";
import { detunedReaktorAyarFrekansi } from "./detuned-reaktor-ayar-frekansi";

describe("Detuned Reaktör Ayar Frekansı", () => {
  it("%7, 50 Hz → 189 Hz, 5. harmonik (250 Hz) altında → uygun", () => {
    const r = detunedReaktorAyarFrekansi.compute({ sebekeFrekansi_Hz: "50", reaktorOrani_yuzde: 7, enDusukHarmonik: 5 });
    expect(r.value.ayarFrekansi_Hz).toBeCloseTo(188.98, 1);
    expect(r.verdict?.status).toBe("uygun");
  });
  it("%5,67 → 210 Hz, %14 → 134 Hz (katalog değerleri)", () => {
    expect(detunedReaktorAyarFrekansi.compute({ sebekeFrekansi_Hz: "50", reaktorOrani_yuzde: 5.67, enDusukHarmonik: 5 }).value.ayarFrekansi_Hz).toBeCloseTo(210, 0);
    expect(detunedReaktorAyarFrekansi.compute({ sebekeFrekansi_Hz: "50", reaktorOrani_yuzde: 14, enDusukHarmonik: 3 }).value.ayarFrekansi_Hz).toBeCloseTo(133.6, 0);
  });
  it("%1 reaktör → 500 Hz, uygunsuz", () => {
    expect(detunedReaktorAyarFrekansi.compute({ sebekeFrekansi_Hz: "50", reaktorOrani_yuzde: 1, enDusukHarmonik: 5 }).verdict?.status).toBe("uygunsuz");
  });
});
