# Metranik

Mühendislik hesap platformu. Mimari ve kurallar için [CLAUDE.md](./CLAUDE.md).

## Kurulum

```bash
pnpm install
pnpm build
pnpm test
pnpm dev   # apps/web, http://localhost:3000
```

Node 20+, pnpm gerekir.

## Yapı

```
/packages/core-calc   → hesap motoru (saf TS, yan etkisiz). Vitest.
/apps/web             → Next.js (App Router) arayüzü.
```

## Yeni hesap modülü nasıl eklenir

1. `packages/core-calc/src/modules/<modul-id>.ts` oluştur:
   - Zod `inputSchema` tanımla.
   - `compute(input): CalcResult<O>` yaz — **saf fonksiyon**: yan etki, ağ, tarih, random YOK.
   - `intermediates` içinde ara değerleri döndür (denetim şeffaflığı).
   - `standardsUsed` içinde kullanılan standart + sürümü belirt.
2. Aynı dizine `<modul-id>.test.ts` ekle: standarttan/ders kitabından **çözümlü bir örneği**
   yeniden üretip beklenen sayısal sonucu tolerans içinde doğrula.
3. `packages/core-calc/src/index.ts` içinden modülü export et.
4. `pnpm test` yeşil olmadan commit etme.
5. Gerekirse `apps/web` tarafında modülü çağıran form/sayfa ekle.

Bkz. `packages/core-calc/src/modules/isitma-yuku-ts825.ts` örnek olarak.

> **Not:** `isitma-yuku-ts825` modülündeki iklim bölgesi ve W/m² katsayıları şu an
> yer tutucudur (TS 825 Ek-A/Ek-B tablolarından resmi olarak doğrulanmamıştır).
> Gerçek mühendislik kararında kullanılmadan önce standarttan teyit edilmelidir.

## Hesap motoru sözleşmesi

Bkz. CLAUDE.md §3. Özet: LLM asla hesap yapmaz; yalnız modül seçer ve girdi önerir.
Sayıyı her zaman `compute()` üretir.
