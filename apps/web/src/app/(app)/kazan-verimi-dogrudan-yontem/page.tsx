"use client";

import { kazanVerimiDogrudanYontem } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KazanVerimiDogrudanYontemPage() {
  return (
    <CalcPage
      module={kazanVerimiDogrudanYontem}
      standardsLabel="Doğrudan (Giriş-Çıkış) Yöntem"
      description="Sıcak su kazanının sahada ölçülen su debisi, gidiş-dönüş sıcaklıkları ve gaz sayacı debisinden ısıl verimini doğrudan yöntemle hesaplar."
      formula="Qsu = V̇·ρ·cp·(Tgidiş − Tdönüş),   Qyakıt = V̇gaz·Hu,   η = Qsu / Qyakıt"
      engineeringNote="Gaz debisi normal koşullara (0 °C, 1013 mbar) düzeltilmiş olmalıdır: sayaç okuması × (pmutlak/1013) × (273/(273 + tgaz)). Ölçüm, kazan kararlı rejimdeyken (en az 15–30 dakika sabit yükte) yapılmalıdır. Su yoğunluğu debinin ölçüldüğü noktadaki sıcaklığa göre alınır (50 °C'de ≈ 988, 70 °C'de ≈ 978 kg/m³). Hu esaslı verimde yoğuşmalı kazanlar %100'ü aşabilir; %111'in üstü fiziksel olarak mümkün değildir. Kazan Baca Gazı Kaybı (Siegert) modülündeki dolaylı yöntemle karşılaştırarak ölçümü doğrulayabilirsiniz."
      fields={[
        { key: "suDebisi_m3h", label: "Su Debisi (m³/h)", type: "number", min: 0.01, step: 0.1 },
        { key: "suYogunlugu_kgm3", label: "Su Yoğunluğu (kg/m³)", type: "number", min: 900, step: 1 },
        { key: "gidisSicakligi_C", label: "Gidiş Suyu Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "donusSicakligi_C", label: "Dönüş Suyu Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "gazDebisi_Nm3h", label: "Gaz Debisi, Normal Koşul (Nm³/h)", type: "number", min: 0.01, step: 0.1 },
        { key: "altIsilDeger_Hu_kWhm3", label: "Alt Isıl Değer Hu (kWh/Nm³)", type: "number", min: 1, step: 0.01 },
      ]}
      defaults={{
        suDebisi_m3h: 2,
        suYogunlugu_kgm3: 980,
        gidisSicakligi_C: 70,
        donusSicakligi_C: 50,
        gazDebisi_Nm3h: 5,
        altIsilDeger_Hu_kWhm3: 9.59,
      }}
      mainUnit="% (Hu esaslı)"
      mainValueKey="kazanVerimi_yuzde"
      mainDecimals={1}
      intermediateLabels={{
        suya_verilen_isi_kW: "Suya Verilen Isı (kW)",
        yakit_isil_yuku_kW: "Yakıt Isıl Yükü (kW)",
        kayip_kW: "Kayıp (kW)",
        su_kutle_debisi_kgs: "Su Kütle Debisi (kg/s)",
      }}
    />
  );
}
