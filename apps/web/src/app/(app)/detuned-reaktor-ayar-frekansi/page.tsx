"use client";

import { detunedReaktorAyarFrekansi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function DetunedReaktorAyarFrekansiPage() {
  return (
    <CalcPage
      module={detunedReaktorAyarFrekansi}
      standardsLabel="IEC 61642 — harmonikli şebekede filtre ve şönt kondansatör uygulaması"
      description="Seri reaktörlü (detuned) kompanzasyon panosunun ayar (rezonans) frekansını hesaplar ve şebekedeki en düşük baskın harmonikle karşılaştırır."
      formula="fr = fn/√(p/100);   uygun: fr ≤ 0,9·h_min·fn"
      engineeringNote="Reaktör oranı p = XL/XC (%). Yaygın değerler: %5,67 (≈210 Hz), %7 (≈189 Hz), %14 (≈134 Hz). Üç faz doğrusal olmayan yüklerde baskın harmonik 5.'dir (250 Hz); 3. harmonik baskınsa (tek faz yükler) %14 reaktör gerekir. Reaktör ayrıca kondansatör geriliminin yükselmesine yol açar — kondansatör anma gerilimi üreticiye göre seçilmelidir. Rezonans kontrolü için Kompanzasyon Rezonans Kontrolü modülüne bakın."
      fields={[
        {
          key: "sebekeFrekansi_Hz",
          label: "Şebeke Frekansı",
          type: "select",
          options: [
            { value: "50", label: "50 Hz" },
            { value: "60", label: "60 Hz" },
          ],
        },
        { key: "reaktorOrani_yuzde", label: "Reaktör Oranı p (%)", type: "number", min: 1, step: 0.5 },
        { key: "enDusukHarmonik", label: "En Düşük Baskın Harmonik Mertebesi (2–7)", type: "number", min: 2, step: 1 },
      ]}
      defaults={{ sebekeFrekansi_Hz: "50", reaktorOrani_yuzde: 7, enDusukHarmonik: 5 }}
      mainUnit="Hz (ayar frekansı)"
      mainValueKey="ayarFrekansi_Hz"
      mainDecimals={0}
      intermediateLabels={{
        ayar_harmonigi: "Ayar Harmoniği (fr/fn)",
        baskin_harmonik_frekansi_Hz: "Baskın Harmonik Frekansı (Hz)",
        pay_yuzde: "Harmoniğe Uzaklık Payı (%)",
      }}
    />
  );
}
