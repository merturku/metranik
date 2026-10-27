"use client";

import { topraklamaIzgarasiDirenci } from "@metranik/core-calc";
import { CalcPage } from "@/components/calc-page";

export default function TopraklamaIzgarasiDirenciPage() {
  return (
    <CalcPage
      module={topraklamaIzgarasiDirenci}
      standardsLabel="IEEE Std 80"
      description="Trafo merkezi, şalt sahası veya bina temeli altındaki yatay topraklama ızgarasının (ağ) yayılma direncini Sverak bağıntısıyla hesaplar; Laurent-Niemann sonucunu karşılaştırma için verir ve ızgaraya akan arıza akımından toprak potansiyel yükselmesini (GPR) bulur."
      formula="Rg = ρ·[1/LT + 1/√(20A)·(1 + 1/(1 + h·√(20/A)))],   Rg,LN = ρ/4·√(π/A) + ρ/LT,   GPR = IG·Rg"
      engineeringNote="Izgara direnci büyük ölçüde kapladığı alanla belirlenir; iletken uzunluğunu (göz sıklaştırma, çubuk ekleme) artırmak direnci yalnız sınırlı azaltır — IEEE 80 örneğinde 150 m çubuk eklemek 2,78 Ω'u yalnız 2,75 Ω'a indirir. LT ızgara iletkenleri ile topraklama çubuklarının toplam boyudur. ρ homojen zemin varsayımıdır; tabakalı zeminde Wenner ölçümünden iki tabakalı model kurulmalıdır. Sverak bağıntısı 0,25–2,5 m gömme derinliği içindir. IEEE 80'e göre asıl tasarım ölçütü direnç değil, GPR'nin oluşturduğu dokunma ve adım gerilimlerinin izin verilen sınırların altında kalmasıdır; GPR izin verilen dokunma geriliminin altındaysa ayrıntılı göz/adım gerilimi hesabına gerek kalmaz. IG, toplam toprak arıza akımının ızgaradan toprağa akan kısmıdır (iletken kılıf/koruma iletkenleriyle dönen kısım düşülür)."
      fields={[
        { key: "zeminOzdirenci_ohmm", label: "Zemin Özdirenci ρ (Ω·m)", type: "number", min: 1, step: 10 },
        { key: "izgaraAlani_m2", label: "Izgara Alanı A (m²)", type: "number", min: 1, step: 10 },
        { key: "toplamIletkenBoyu_m", label: "Toplam Gömülü İletken Boyu LT (m)", type: "number", min: 1, step: 10 },
        { key: "gommeDerinligi_m", label: "Gömme Derinliği h (m)", type: "number", min: 0.1, step: 0.05 },
        { key: "izgaraAkimi_IG_kA", label: "Izgaradan Akan Arıza Akımı IG (kA)", type: "number", min: 0, step: 0.1 },
      ]}
      defaults={{
        zeminOzdirenci_ohmm: 400,
        izgaraAlani_m2: 4900,
        toplamIletkenBoyu_m: 1540,
        gommeDerinligi_m: 0.5,
        izgaraAkimi_IG_kA: 1.908,
      }}
      mainUnit="Ω (ızgara direnci)"
      mainValueKey="direnc_Rg_ohm"
      mainDecimals={2}
      intermediateLabels={{
        laurent_niemann_Rg_ohm: "Laurent-Niemann Direnci (Ω)",
        esdeger_daire_yaricapi_m: "Eşdeğer Daire Yarıçapı (m)",
        toprak_potansiyel_yukselmesi_GPR_V: "Toprak Potansiyel Yükselmesi GPR (V)",
        gecerlilik: "Geçerlilik",
      }}
    />
  );
}
