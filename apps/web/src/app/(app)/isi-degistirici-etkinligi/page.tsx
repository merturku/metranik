"use client";

import { isiDegistiriciEtkinligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function IsiDegistiriciEtkinligiPage() {
  return (
    <CalcPage
      module={isiDegistiriciEtkinligi}
      standardsLabel="ε-NTU Yöntemi (Temel Tanım)"
      description="Sıcak akışkanın giriş/çıkış sıcaklıkları ile soğuk akışkan giriş sıcaklığına göre ısı değiştiricinin (eşanjör) termal etkinliğini hesaplar."
      formula="ε = (Th,giriş - Th,çıkış) / (Th,giriş - Tc,giriş)"
      engineeringNote="Bu tanım sıcak akışkanın ısıl kapasitesinin (ṁ×cp) minimum olduğu durumu esas alır; ε=1 teorik maksimum ısı transferini, düşük ε değerleri eşanjörün yetersiz olduğunu gösterir."
      fields={[
        {
          key: "sicakGirisSicakligi_ThIn_C",
          label: "Sıcak Akışkan Giriş Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
        {
          key: "sicakCikisSicakligi_ThOut_C",
          label: "Sıcak Akışkan Çıkış Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
        {
          key: "sogukGirisSicakligi_TcIn_C",
          label: "Soğuk Akışkan Giriş Sıcaklığı (°C)",
          type: "number",
          step: 1,
        },
      ]}
      defaults={{
        sicakGirisSicakligi_ThIn_C: 90,
        sicakCikisSicakligi_ThOut_C: 60,
        sogukGirisSicakligi_TcIn_C: 20,
      }}
      mainUnit=""
      mainValueKey="etkinlik_epsilon"
      intermediateLabels={{
        gerceklesenSicaklikFarki_C: "Gerçekleşen Sıcaklık Farkı (°C)",
        maksimumSicaklikFarki_C: "Maksimum Sıcaklık Farkı (°C)",
      }}
    />
  );
}
