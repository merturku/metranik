"use client";

import { asiriAkimRoleAcmaSuresi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function AsiriAkimRoleAcmaSuresiPage() {
  return (
    <CalcPage
      module={asiriAkimRoleAcmaSuresi}
      standardsLabel="IEC 60255-151 — ters zamanlı aşırı akım karakteristikleri"
      description="Ters zamanlı aşırı akım rölesinin, arıza akımı ve ayar değerlerine göre açma süresini standart eğrilerle hesaplar."
      formula="t = TMS·k / ((I/Is)^α − 1)    SI: k=0,14 α=0,02;  VI: 13,5 / 1;  EI: 80 / 2;  LTI: 120 / 1"
      engineeringNote="I ≤ Is ise röle çalışmaz ve süre tanımsızdır. Üretici röleleri bu eğrilere ek olarak minimum süre, yüksek akımda sabit süre veya sıfırlanma karakteristiği içerebilir; kesin koordinasyon için röle üretici eğrileri ve seçicilik çalışması gerekir. Arıza akımı için Kısa Devre Akımı ve Trafo Kısa Devre Akımı modüllerine bakın."
      fields={[
        {
          key: "egri",
          label: "Eğri Tipi",
          type: "select",
          options: [
            { value: "si", label: "Standart Ters (SI)" },
            { value: "vi", label: "Çok Ters (VI)" },
            { value: "ei", label: "Aşırı Ters (EI)" },
            { value: "lti", label: "Uzun Süreli Ters (LTI)" },
          ],
        },
        { key: "arizaAkimi_A", label: "Arıza Akımı I (A)", type: "number", min: 1, step: 50 },
        { key: "baslamaAkimi_A", label: "Başlama (Pickup) Akımı Is (A)", type: "number", min: 1, step: 10 },
        { key: "zamanCarpani", label: "Zaman Çarpanı TMS", type: "number", min: 0.01, step: 0.05 },
      ]}
      defaults={{ egri: "si", arizaAkimi_A: 1000, baslamaAkimi_A: 100, zamanCarpani: 0.5 }}
      mainUnit="s (açma süresi)"
      mainValueKey="acmaSuresi_s"
      mainDecimals={3}
      intermediateLabels={{
        akim_kati: "Akım Katı I/Is",
        egri: "Eğri",
        k_katsayisi: "k Katsayısı",
        alfa_ussu: "α Üssü",
        durum: "Durum",
      }}
    />
  );
}
