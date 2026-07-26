import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanım Koşulları & KVKK — Metranik",
  description: "Metranik veri gizliliği ve kullanım koşulları",
};

export default function KvkkPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-16">
      <h1 className="text-2xl font-bold tracking-tight text-text-primary">
        Kullanım Koşulları &amp; KVKK
      </h1>
      <p className="mt-2 text-sm text-text-tertiary">Son güncelleme: 2026-07</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-text-secondary">
        <section>
          <h2 className="text-base font-semibold text-text-primary">1. Üyelik ve Kişisel Veri</h2>
          <p className="mt-2">
            Metranik'in çekirdek kullanımı (hesap modülleri, sonuçlar, ara değerler) üyelik veya
            kayıt gerektirmez. Kimlik, iletişim veya benzeri kişisel veri toplanmaz; hesap
            modüllerine girdiğiniz mühendislik değerleri (m², kW, mm gibi) sunucuya kişisel veri
            olarak gönderilmez.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text-primary">2. Hesaplamalar Nerede Çalışır</h2>
          <p className="mt-2">
            Tüm hesap motoru (<code className="rounded bg-border/40 px-1 py-0.5 text-xs">@metranik/core-calc</code>)
            tarayıcınızda, cihazınızda çalışır. Girdi değerleriniz hesaplama için sunucuya
            gönderilmez; sonuç doğrudan tarayıcınızda üretilir.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text-primary">3. Yerel Depolama (localStorage)</h2>
          <p className="mt-2">
            Son kullanılan hesaplar, en çok kullanılan modüller ve bu KVKK bildirimine verdiğiniz
            onay yalnızca tarayıcınızın yerel hafızasında (localStorage) saklanır. Bu veriler
            başka bir sunucuya gönderilmez ve yalnızca kullandığınız cihazda/tarayıcıda kalır.
            Tarayıcı verilerini temizlerseniz bu kayıtlar da silinir.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text-primary">4. Çerezler</h2>
          <p className="mt-2">
            Site şu an işleyiş için zorunlu yerel kayıtlar dışında izleme çerezi kullanmaz.
            İleride reklam/sponsorluk altyapısı eklendiğinde kullanılacak çerezler için bu
            sayfa güncellenecek ve ayrı onayınız istenecektir.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text-primary">5. Ön Boyutlandırma Uyarısı</h2>
          <p className="mt-2">
            Metranik'teki tüm hesaplar ön boyutlandırma amaçlıdır; nihai karar mühendis kontrolü
            gerektirir. Sonuçlar mühendislik standartlarına atıfla üretilir ancak proje bazlı
            resmi onay/mühürleme yerine geçmez.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text-primary">6. İletişim</h2>
          <p className="mt-2">
            Bu bildirimle ilgili sorularınız için site üzerindeki iletişim kanallarını
            kullanabilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
