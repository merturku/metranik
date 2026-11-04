-- Metranik: kayıtlı hesaplar (Projelerim) için bulut eşitleme şeması.
-- Supabase SQL editöründe çalıştırın. Her satır yalnız sahibine açıktır (RLS).
create table if not exists public.kayitli_hesaplar (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade default auth.uid(),
  proje      text not null,
  module_id  text not null,
  veri       jsonb not null,            -- istemcideki KayitliHesap nesnesi
  tarih      timestamptz not null default now()
);

create index if not exists kayitli_hesaplar_user_idx on public.kayitli_hesaplar (user_id, proje);

alter table public.kayitli_hesaplar enable row level security;

create policy "sahibi okur"   on public.kayitli_hesaplar for select using (user_id = auth.uid());
create policy "sahibi ekler"  on public.kayitli_hesaplar for insert with check (user_id = auth.uid());
create policy "sahibi günceller" on public.kayitli_hesaplar for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "sahibi siler"  on public.kayitli_hesaplar for delete using (user_id = auth.uid());
