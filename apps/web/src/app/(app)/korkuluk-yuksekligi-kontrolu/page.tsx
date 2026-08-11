"use client";

import { korkulukYuksekligiKontrolu } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KorkulukYuksekligiKontroluPage() {
  return (
    <CalcPage
      module={korkulukYuksekligiKontrolu}
      standardsLabel="TS 9111"
      description="Merdiven, balkon veya teras korkuluğunun ölçülen yüksekliğini yönetmelikte tanımlanan asgari yükseklikle karşılaştırır."
      formula="Marj = Ölçülen Yükseklik − Asgari Yükseklik"
      engineeringNote="Asgari yükseklik kullanım tipine göre değişir (konut içi merdivende ~90cm, balkon/terasta kat yüksekliğine bağlı olarak ~90-110cm); kesin sınır projeye uygulanacak yönetmelikten (TS 9111 / Planlı Alanlar İmar Yönetmeliği) teyit edilmelidir."
      fields={[
        {
          key: "olculenYukseklik_cm",
          label: "Ölçülen Yükseklik (cm)",
          type: "number",
          min: 10,
          step: 1,
        },
        {
          key: "asgariYukseklik_cm",
          label: "Asgari Yükseklik (cm)",
          type: "number",
          min: 10,
          step: 1,
        },
      ]}
      defaults={{ olculenYukseklik_cm: 100, asgariYukseklik_cm: 90 }}
      mainUnit="cm"
      mainValueKey="marj_cm"
      intermediateLabels={{ asgariYukseklik_cm: "Asgari Yükseklik (cm)" }}
    />
  );
}
