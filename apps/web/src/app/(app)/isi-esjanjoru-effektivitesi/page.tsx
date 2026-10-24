"use client";
import { CalcPage } from "@/components/calc-page";
import { isiEsjanjoreEffektivitesi } from "@metranik/core-calc";

export default function Page() {
  return (
    <CalcPage
      module={isiEsjanjoreEffektivitesi}
      standardsLabel="ε-NTU Yöntemi (Temel Tanım)"
      description="Eşanjörün giriş/çıkış sıcaklıklarından gerçekleşen ısı transferinin teorik maksimuma oranını (etkinlik) hesaplar ve istenen asgari etkinlikle karşılaştırır."
      formula="ε = max(ΔTsıcak, ΔTsoğuk) / (Tsıcak,giriş - Tsoğuk,giriş)"
      engineeringNote="Isıl kapasite debisi (ṁ×cp) küçük olan akışkan daha büyük sıcaklık değişimine uğradığı için etkinlik bu taraftan okunur. Tasarıma göre düşük etkinlik, yetersiz ısı transfer yüzeyine ya da kirlenmeye işaret eder."
      fields={[
        { key: "sicaklik_giris_sicak_C", label: "Sıcak Akışkan Giriş (°C)", type: "number", step: 1 },
        { key: "sicaklik_cikis_sicak_C", label: "Sıcak Akışkan Çıkış (°C)", type: "number", step: 1 },
        { key: "sicaklik_giris_soğuk_C", label: "Soğuk Akışkan Giriş (°C)", type: "number", step: 1 },
        { key: "sicaklik_cikis_soğuk_C", label: "Soğuk Akışkan Çıkış (°C)", type: "number", step: 1 },
        { key: "min_effektivite", label: "Asgari Etkinlik (0-1)", type: "number", min: 0.05, step: 0.05 },
      ]}
      defaults={{
        sicaklik_giris_sicak_C: 80,
        sicaklik_cikis_sicak_C: 70,
        sicaklik_giris_soğuk_C: 20,
        sicaklik_cikis_soğuk_C: 65,
        min_effektivite: 0.7,
      }}
      mainUnit=""
      mainValueKey="effektivite"
      mainDecimals={3}
      intermediateLabels={{
        sicakTarafFarki_C: "Sıcak Taraf ΔT (°C)",
        sogukTarafFarki_C: "Soğuk Taraf ΔT (°C)",
        minEffektivite: "Asgari Etkinlik",
      }}
    />
  );
}
