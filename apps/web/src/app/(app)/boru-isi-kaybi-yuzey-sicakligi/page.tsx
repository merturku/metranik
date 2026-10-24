"use client";
import { CalcPage } from "@/components/calc-page";
import { boruIsiKaybiYuzeySicakligi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={boruIsiKaybiYuzeySicakligi}
      standardsLabel="ASTM C1055 (düzlemsel yaklaşım)"
      description="Yalıtım kalınlığından, iletim ve dış taşınım dirençlerinin seri bağlandığı düzlemsel modelle yalıtım dış yüzey sıcaklığını hesaplar ve dokunma güvenliği sınırıyla karşılaştırır."
      formula="Tyüzey = Tiç − (Tiç − Tortam) × (t/k) / (t/k + 1/h)"
      engineeringNote="Model k = 0,04 W/mK yalıtım ve h = 10 W/m²K dış taşınım varsayar; yalıtım kalınlığı boru yarıçapına göre küçük değilse silindirik geometriyi dikkate alan modül kullanılmalıdır. ASTM C1055 erişilebilir yüzeyler için tipik olarak ~60 °C üst sınır önerir."
      fields={[
        { key: "ic_sicaklik_C", label: "Akışkan Sıcaklığı (°C)", type: "number", step: 5 },
        { key: "ortam_sicakligi_C", label: "Ortam Sıcaklığı (°C)", type: "number", step: 1 },
        { key: "isolasyon_kalınligi_mm", label: "Yalıtım Kalınlığı (mm)", type: "number", min: 1, step: 5 },
        { key: "max_yuzey_sicakligi_C", label: "İzin Verilen Yüzey Sıcaklığı (°C)", type: "number", step: 1 },
      ]}
      defaults={{
        ic_sicaklik_C: 80,
        ortam_sicakligi_C: 20,
        isolasyon_kalınligi_mm: 50,
        max_yuzey_sicakligi_C: 60,
      }}
      mainUnit="°C"
      mainValueKey="yuzey_sicakligi_C"
      mainDecimals={1}
      intermediateLabels={{
        iletim_direnci_m2KW: "İletim Direnci (m²K/W)",
        tasinim_direnci_m2KW: "Taşınım Direnci (m²K/W)",
        isi_akisi_Wm2: "Isı Akısı (W/m²)",
      }}
    />
  );
}
