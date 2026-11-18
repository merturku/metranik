"use client";

import { kompresorOzgulGucEnerjiMaliyeti } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KompresorOzgulGucEnerjiMaliyetiPage() {
  return (
    <CalcPage
      module={kompresorOzgulGucEnerjiMaliyeti}
      standardsLabel={"ISO 1217 / özgül güç tanımı"}
      description={"Kompresörün şaft/giriş gücü ve serbest hava debisinden özgül gücü (kW/(m³/dk), kWh/m³), yıllık enerji tüketimini ve 1000 m³ hava maliyetini hesaplar."}
      formula={"Özgül güç = P/FAD;  kWh/m³ = P/(60·FAD);  E = P·yük oranı·saat"}
      engineeringNote={"P, ISO 1217 koşullarında ölçülen toplam paket giriş gücüdür (kurutucu ve soğutma fanı dahil/hariç olması karşılaştırmada aynı olmalı). Yük oranı, kompresörün yüklü çalışma payını ve boşta çalışma kayıplarını yaklaşık yansıtır; boşta güç ayrı eklenirse daha doğru olur. Kaçaklar tüketimin %20–30'una çıkabilir (Basınçlı Hava Delik Kaçak modülüne bakın)."}
      fields={[
        { key: "guc_kW", label: "Paket Giriş Gücü (kW)", type: "number", step: 5, min: 0.1 },
        { key: "fad_m3dk", label: "Serbest Hava Debisi FAD (m³/dk)", type: "number", step: 0.5, min: 0.01 },
        { key: "yukOrani", label: "Yük Oranı (0–1)", type: "number", step: 0.05, min: 0 },
        { key: "saat_h", label: "Yıllık Çalışma (saat)", type: "number", step: 100, min: 1 },
        { key: "fiyat", label: "Elektrik Birim Fiyatı (₺/kWh)", type: "number", step: 0.1, min: 0 },
      ]}
      defaults={{ guc_kW: 75, fad_m3dk: 12.5, yukOrani: 0.7, saat_h: 6000, fiyat: 4 }}
      mainUnit={"kW/(m³/dk)"}
      mainValueKey={"ozgulGuc"}
      mainDecimals={2}
      intermediateLabels={{
        kWh_per_m3: "Özgül Enerji (kWh/m³)",
        yillik_enerji_kWh: "Yıllık Enerji (kWh)",
        yillik_maliyet: "Yıllık Maliyet (₺)",
        maliyet_1000m3: "1000 m³ Hava Maliyeti (₺)",
      }}
    />
  );
}
