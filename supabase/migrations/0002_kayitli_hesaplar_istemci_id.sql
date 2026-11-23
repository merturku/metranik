-- Bulut yedeğinin tekrar çalıştırıldığında çoğaltma yapmaması için istemci kayıt kimliği.
-- 0001'den sonra çalıştırın.
alter table public.kayitli_hesaplar add column if not exists istemci_id text;

create unique index if not exists kayitli_hesaplar_istemci_uq
  on public.kayitli_hesaplar (user_id, istemci_id);
