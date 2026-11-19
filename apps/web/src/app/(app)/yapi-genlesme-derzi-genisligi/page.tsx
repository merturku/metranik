"use client";

import { yapiGenlesmeDerziGenisligi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function YapiGenlesmeDerziGenisligiPage() {
  return (
    <CalcPage
      module={yapiGenlesmeDerziGenisligi}
      standardsLabel={"Doğrusal ısıl genleşme δ = αΔTL"}
      description={"Yapı bloğunun boyu, malzemenin ısıl genleşme katsayısı ve tasarım sıcaklık farkından serbest ısıl hareketi, derz dolgu hareket kapasitesine göre gerekli derz genişliğini ve mevcut derz için azami blok boyunu hesaplar."}
      formula={"δ = α·ΔT·L;  w = δ·(1+pay)/MAC;  Lmaks = w·MAC/(α·ΔT·(1+pay))"}
      engineeringNote={"Yalnız ısıl hareketi kapsar; rötre, sünme ve deprem ötelenmesi ayrıca eklenmelidir (TBDY 2018 bina bitişik blok aralığı ayrı kontrol). Beton için α ≈ 10·10⁻⁶ /K, çelik için ≈ 12·10⁻⁶ /K tipik değerlerdir. MAC derz dolgusunun üretici beyanlı hareket kapasitesidir (örn. ±%25). Sıcaklık farkı yapıyı saran ortam değil yapı elemanı sıcaklığıdır."}
      fields={[
        { key: "blokBoyu_m", label: "Blok Boyu L (m)", type: "number", step: 1, min: 0.5 },
        { key: "isilGenlesmeKatsayisi_1e6", label: "Isıl Genleşme Katsayısı α (×10⁻⁶ /K)", type: "number", step: 0.5, min: 0.5 },
        { key: "tasarimSicaklikFarki_K", label: "Tasarım Sıcaklık Farkı ΔT (K)", type: "number", step: 5, min: 1 },
        { key: "emniyetPayi", label: "Emniyet Payı (0,2 = %20)", type: "number", step: 0.05, min: 0 },
        { key: "derzDolguHareketKapasitesi_yuzde", label: "Derz Dolgusu Hareket Kapasitesi MAC (%)", type: "number", step: 5, min: 1 },
        { key: "mevcutDerzGenisligi_mm", label: "Mevcut Derz Genişliği (mm, 0 = kontrol yok)", type: "number", step: 5, min: 0 },
      ]}
      defaults={{ blokBoyu_m: 20, isilGenlesmeKatsayisi_1e6: 10, tasarimSicaklikFarki_K: 50, emniyetPayi: 0, derzDolguHareketKapasitesi_yuzde: 25, mevcutDerzGenisligi_mm: 30 }}
      mainUnit={"mm"}
      mainValueKey={"gerekliDerzGenisligi_mm"}
      mainDecimals={1}
      intermediateLabels={{
        serbest_isil_hareket_mm: "Serbest Isıl Hareket (mm)",
        tasarim_hareketi_mm: "Emniyet Paylı Tasarım Hareketi (mm)",
        mevcut_derz_icin_azami_blok_boyu_m: "Mevcut Derz İçin Azami Blok Boyu (m)",
      }}
    />
  );
}
