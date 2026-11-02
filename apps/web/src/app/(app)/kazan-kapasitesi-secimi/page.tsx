"use client";

import { kazanKapasitesiSecimi } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function KazanKapasitesiSecimiPage() {
  return (
    <CalcPage
      module={kazanKapasitesiSecimi}
      standardsLabel="TS EN 12831 (bina ısı yükü) / TS EN 12828 (sistem tasarımı)"
      description="Bina ısı yükü, boru kayıpları, ısınma payı ve sıcak su yükünden gereken kazan gücünü ve yakıt giriş gücünü hesaplar."
      formula="Q_kazan = Q_bina·(1 + f_boru)·(1 + f_ısınma) + Q_sıcaksu;   Q_yakıt = Q_kazan/η"
      engineeringNote="Bina ısı yükü için Isıtma Yükü (TS 825) modülünü kullanın. Boru kaybı yalıtımlı tesisatta %5–10, ısınma payı kesintili işletmede %0–20 alınır. Sıcak su yükü anlık ısıtmada eşzamanlı çekişe, depolu sistemde ısınma süresine göre belirlenir (Sıcak Su/Boyler DIN 4708). Sonuç üreticinin standart kapasite basamağına yukarı yuvarlanır."
      fields={[
        { key: "binaIsiYuku_kW", label: "Bina Isı Yükü (kW)", type: "number", min: 1, step: 5 },
        { key: "boruKaybiYuzde", label: "Boru / Dağıtım Kaybı (%)", type: "number", min: 0, step: 1 },
        { key: "isinmaPayiYuzde", label: "Isınma Payı (%)", type: "number", min: 0, step: 1 },
        { key: "sicakSuYuku_kW", label: "Sıcak Su Yükü (kW)", type: "number", min: 0, step: 1 },
        { key: "kazanVerimi", label: "Kazan Verimi (0–1)", type: "number", min: 0.1, step: 0.01 },
      ]}
      defaults={{ binaIsiYuku_kW: 100, boruKaybiYuzde: 5, isinmaPayiYuzde: 10, sicakSuYuku_kW: 15, kazanVerimi: 0.92 }}
      mainUnit="kW (kazan gücü)"
      mainValueKey="kazanGucu_kW"
      mainDecimals={1}
      intermediateLabels={{
        payli_isitma_yuku_kW: "Paylı Isıtma Yükü (kW)",
        sicak_su_yuku_kW: "Sıcak Su Yükü (kW)",
        yakit_giris_gucu_kW: "Yakıt Giriş Gücü (kW)",
        kcal_h: "Kazan Gücü (kcal/h)",
        toplam_pay_orani: "Toplam / Bina Yükü",
      }}
    />
  );
}
