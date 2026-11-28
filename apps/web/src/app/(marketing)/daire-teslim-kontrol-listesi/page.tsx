import type { Metadata } from "next";
import { KontrolListesi } from "./kontrol-listesi";

export const metadata: Metadata = {
  title: "Daire Teslim Kontrol Listesi — Metranik",
  description:
    "Yeni daire teslim alırken duvar, kapı-pencere, elektrik, tesisat ve ısıtma için işaretlenebilir, yazdırılabilir kontrol listesi.",
};

export default function DaireTeslimPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="text-2xl font-bold tracking-tight text-text-primary">Daire Teslim Kontrol Listesi</h1>
      <p className="mt-2 text-sm text-text-secondary">
        Yeni daireyi teslim alırken tek tek işaretleyin. İşaretleriniz yalnız bu cihazda (tarayıcıda) saklanır,
        sunucuya gönderilmez.
      </p>
      <KontrolListesi />
      <p className="mt-10 border-t border-border pt-4 text-xs text-text-tertiary">
        Genel bir saha kontrol listesidir; hukuki bir belge değildir. Tespit ettiğiniz eksikleri teslim tutanağına yazılı
        olarak kaydettirin.
      </p>
    </div>
  );
}
